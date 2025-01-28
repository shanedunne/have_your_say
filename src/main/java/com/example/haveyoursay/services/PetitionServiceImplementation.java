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
        Optional<Petition> petition = petitionRepository.findById(id);
        return petition.orElseThrow(() -> new IllegalArgumentException("Petition not found with ID: " + id));
    }

    @Override
    public void savePetition(Petition petition) {
        petitionRepository.save(petition);
    }
    
}
