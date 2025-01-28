package com.example.haveyoursay.controllers;

import com.example.haveyoursay.models.Petition;
import com.example.haveyoursay.repositories.PetitionRepository;
import com.example.haveyoursay.services.PetitionServiceImplementation;

import com.example.haveyoursay.models.User;
import com.example.haveyoursay.services.UserServiceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/petition")
public class PetitionController {
    @Autowired
    private PetitionRepository petitionRepository;

    @Autowired
    private PetitionServiceImplementation petitionServiceImplementation;

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @PostMapping("/create")
    public ResponseEntity<?> createPetition(@RequestBody Petition petition,
            @RequestHeader("Authorization") String token) {
        System.out.println("Received request to create petition: " + petition.toString());

        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        String title = petition.getTitle();
        String category = petition.getCategory();
        String body = petition.getBody();
        Long startTime = petition.getStartTime();
        Long closeTime = petitionServiceImplementation.getPetitionCloseTime(startTime);

        Petition createdPetition = new Petition();
        createdPetition.setTitle(title);
        createdPetition.setCategory(category);
        createdPetition.setBody(body);
        createdPetition.setStartTime(startTime);
        createdPetition.setCloseTime(closeTime);
        createdPetition.setUserId(user.getId());
        createdPetition.setRegion(user.getRegion());

        // hard coded below for testing
        createdPetition.setParticipantsAtStart(10);
        createdPetition.setQuota(5);

        try {
            Petition savedPetition = petitionRepository.save(createdPetition);
            System.out.println("Saved petition: " + savedPetition);
            return ResponseEntity.ok(savedPetition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating petition");
        }

    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllPetitions() {
        try {
            List<Petition> allPetitions = petitionRepository.findAll();
            return ResponseEntity.ok(allPetitions);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching petitions");
        }

    }

    @GetMapping("/{id}")
    public Petition getPetitionById(@PathVariable String id) {
        Petition petition = petitionServiceImplementation.getPetitionById(id);
        return petition;
    }

    @PostMapping("/vote")
    public ResponseEntity<?> petitionVote(String petitionId, @RequestHeader("Authorization") String token,
            String decision) {

        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        if (checkHasVoted(token, petitionId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User has already voted on this petition");
        }

        try {
            // Add petition id to the users records
            Petition petition = getPetitionById(petitionId);
            petition.setVotedCount(petition.getVotedCount() + 1);

            // check that the vote standing is below the quota
            if (petition.getVoteStanding() < petition.getQuota()) {

                // if decision is to support, increment support votes count and vote standing
                if (decision.equals("support")) {

                    petition.setSupportVotes(petition.getSupportVotes() + 1);
                    petition.setVoteStanding(petition.getVoteStanding() + 1);

                    // if decision is to oppose, increment opposed votes count and decrement vote
                    // standing
                } else if (decision.equals("oppose")) {

                    petition.setOpposeVotes(petition.getOpposeVotes() + 1);
                    petition.setVoteStanding(petition.getVoteStanding() - 1);
                }
            }

            // add petition to users voting records
            user.getPetitionsVotedOn().add(petitionId);
            userServiceImplementation.updateUser(user);

            // check if latest vote has met the quota
            if (petition.getVoteStanding() >= petition.getQuota()) {
                petition.setStatus("Closed - Petition Supported");
            } else if (petition.getVotedCount() >= petition.getParticipantsAtStart()) {
                petition.setStatus("Closed - Petition Opposed");
            }

            petitionServiceImplementation.savePetition(petition);

            return ResponseEntity.ok(petition);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occured");
        }

    }

    @GetMapping("checkHasVoted")
    public Boolean checkHasVoted(@RequestHeader("Authorization") String token, @RequestParam String petitionId) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return false;
        }

        if (user.getPetitionsVotedOn().contains(petitionId)) {
            return true;
        } else {
            return false;
        }
    }

}
