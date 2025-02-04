package com.example.haveyoursay.services;

import org.springframework.stereotype.Service;

import com.example.haveyoursay.models.Petition;
import com.example.haveyoursay.repositories.PetitionRepository;
import java.util.Optional;

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

    @Override
    public Petition getPetitionById(String id) {
        System.out.println("getting petition from service implementation: " + id);
        Petition petition = petitionRepository.findById(id).orElse(null);
        if (petition == null) {
            System.err.println("no petition found " + id);
        } else {
            System.out.println("Found petition with title: " + petition.getTitle());
        }
        return petition;
    }

    @Override
    public void updatePetition(Petition petition) {
        petitionRepository.save(petition);
    }

}
