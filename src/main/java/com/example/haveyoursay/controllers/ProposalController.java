package com.example.haveyoursay.controllers;

import com.example.haveyoursay.models.Petition;
import com.example.haveyoursay.models.Proposal;
import com.example.haveyoursay.repositories.PetitionRepository;
import com.example.haveyoursay.repositories.ProposalRepository;
import com.example.haveyoursay.services.ProposalServiceImplementation;

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
@RequestMapping("/proposal")
public class ProposalController {
    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private PetitionRepository petitionRepository;

    @Autowired
    private ProposalServiceImplementation proposalServiceImplementation;

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @PostMapping("/create")
    public ResponseEntity<?> createProposal(@RequestBody Proposal proposal,
            @RequestHeader("Authorization") String token) {
        System.out.println("Received request to create proposal: " + proposal.toString());

        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        String title = proposal.getTitle();
        String category = proposal.getCategory();
        String body = proposal.getBody();
        Long startTime = proposal.getStartTime();
        Long endTime = proposal.getEndTime();
        String petitionId = proposal.getPetitionId();

        Proposal createdProposal = new Proposal();
        createdProposal.setTitle(title);
        createdProposal.setCategory(category);
        createdProposal.setBody(body);
        createdProposal.setStartTime(startTime);
        createdProposal.setEndTime(endTime);
        createdProposal.setPetitionId(petitionId);
        createdProposal.setUserId(user.getId());
        createdProposal.setCommunity(user.getCommunity());
        createdProposal.setStatus("open");

        // hard coded below for testing
        createdProposal.setParticipantsAtStart(10);

        try {
            Proposal savedProposal = proposalRepository.save(createdProposal);
            System.out.println("Saved Proposal: " + savedProposal);

            // add proposal id to the petition
            Petition petition = petitionRepository.findById(petitionId).orElse(null);
            if (petition == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Petition not found");
            }

            // set proposal id and save
            petition.setProposalId(savedProposal.getId());
            petitionRepository.save(petition);

            return ResponseEntity.ok(savedProposal);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating proposal");
        }

    }
    // get all proposals
    @GetMapping("/get")
    public ResponseEntity<?> getAllProposals() {
        try {
            List<Proposal> allProposals = proposalRepository.findAll();
            return ResponseEntity.ok(allProposals);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching proposals");
        }

    }
    // get open proposals of for given community
    @GetMapping("/getOpen")
    public ResponseEntity<?> getOpenProposals(@RequestHeader("Authorization") String token) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        String community = user.getCommunity();
        try {
            List<Proposal> OpenProposals = proposalRepository.findByCommunityAndStatus(community, "open");
            return ResponseEntity.ok(OpenProposals);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching petitions");
        }

    }
    // get closed petitions
    @GetMapping("/getClosed")
    public ResponseEntity<?> getClosedProposals(@RequestHeader("Authorization") String token) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        String community = user.getCommunity();
        try {
            List<Proposal> OpenProposals = proposalRepository.findByCommunityAndStatusNot(community, "open");
            return ResponseEntity.ok(OpenProposals);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching petitions");
        }

    }
    
    

    @GetMapping("/{id}")
    public Proposal getProposalById(@PathVariable String id) {
        Proposal proposal = proposalServiceImplementation.getProposalById(id);
        return proposal;
    }

    @GetMapping("checkHasVoted")
    public Boolean checkHasVoted(@RequestHeader("Authorization") String token, @RequestParam String proposalId) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return false;
        }

        if (user.getProposalsVotedOn().contains(proposalId)) {
            return true;
        } else {
            return false;
        }
    }

    

}
