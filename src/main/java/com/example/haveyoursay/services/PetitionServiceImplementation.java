package com.example.haveyoursay.services;

import org.springframework.stereotype.Service;

import com.example.haveyoursay.models.Petition;
import com.example.haveyoursay.repositories.PetitionRepository;

@Service
public class PetitionServiceImplementation implements PetitionService {

    private PetitionRepository petitionRepository;

    public PetitionServiceImplementation(PetitionRepository petitionRepository) {
        this.petitionRepository = petitionRepository;
    }

    @Override
    public Long getPetitionCloseTime(Long petitionStartTime) {
        // add 7 days to the petition start time
        Long petitionCloseTime = petitionStartTime + 604800000;
        return petitionCloseTime;
    }
    
}
