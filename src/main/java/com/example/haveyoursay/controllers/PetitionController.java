package com.example.haveyoursay.controllers;

import com.example.haveyoursay.models.Petition;
import com.example.haveyoursay.repositories.PetitionRepository;
import com.example.haveyoursay.services.PetitionServiceImplementation;

import com.example.haveyoursay.models.User;
import com.example.haveyoursay.services.UserServiceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

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
    public ResponseEntity<?> createPetition(@RequestBody Petition petition, @RequestHeader("Authorization") String token) {
        System.out.println("Received request to create petition: " + petition.toString());

        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if(user == null) {
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

        try {
            Petition savedPetition = petitionRepository.save(createdPetition);
            System.out.println("Saved petition: " + savedPetition);
            return ResponseEntity.ok(savedPetition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating petition");
        }
        
    }

}
