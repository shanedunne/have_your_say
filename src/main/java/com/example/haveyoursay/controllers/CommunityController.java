package com.example.haveyoursay.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.haveyoursay.repositories.PetitionRepository;
import com.example.haveyoursay.repositories.ProposalRepository;
import com.example.haveyoursay.services.ProposalServiceImplementation;
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
    private ProposalRepository proposalRepository;

    @Autowired
    private PetitionRepository petitionRepository;

    @Autowired
    private ProposalServiceImplementation proposalServiceImplementation;

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    
}
