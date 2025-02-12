package com.example.haveyoursay.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.haveyoursay.models.Community;
import com.example.haveyoursay.repositories.CommunityRepository;

import com.example.haveyoursay.models.User;
import com.example.haveyoursay.services.UserServiceImplementation;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private UserServiceImplementation userServiceImplementation;


    @PostMapping("/create")
    public ResponseEntity<?> CreateCommunity(@RequestBody Community community,
            @RequestHeader("Authorization") String token) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        String name = community.getName();
        List<String> admins = community.getAdmins();
        String communityType = community.getCommunityType();
        String accessCode = community.getAccessCode();

        Community createdCommunity = new Community();
        createdCommunity.setName(name);
        createdCommunity.setAdmins(admins);
        createdCommunity.setCommunityType(communityType);
        createdCommunity.setAccessCode(accessCode);

        try {
            Community savedCommunity = communityRepository.save(createdCommunity);
            System.out.println("Created community: " + name);

            return ResponseEntity.ok(savedCommunity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating community");
        }

        
    }

}
