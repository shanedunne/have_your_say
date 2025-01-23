package com.example.haveyoursay.controllers;

import com.example.haveyoursay.models.Petition;
import com.example.haveyoursay.repositories.PetitionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/petition")
public class PetitionController {
    @Autowired
    private PetitionRepository petitionRepository;

    @PostMapping("/create")
    public Petition createPetition(@RequestBody Petition petition) {
        System.out.println("Received request to create petition: " + petition.toString());

        String title = petition.getTitle();
        String category = petition.getCategory();
        String body = petition.getBody();
        Integer startTime = petition.getStartTime();
        Integer closeTime = petition.getCloseTime();
        String userId = petition.getUserId();

        Petition createdPetition = new Petition();
        createdPetition.setTitle(title);
        createdPetition.setCategory(category);
        createdPetition.setBody(body);
        createdPetition.setStartTime(startTime);
        createdPetition.setCloseTime(closeTime);

        Petition savedPetition = petitionRepository.save(createdPetition);
        System.out.println("Saved petition: " + savedPetition);
        return petition;
    }

}
