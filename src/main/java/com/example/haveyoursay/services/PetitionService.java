package com.example.haveyoursay.services;

import com.example.haveyoursay.models.Petition;

public interface PetitionService {
    public Long getPetitionCloseTime(Long petitionStartTime);
    public Petition getPetitionById(String petitionId);
    public void updatePetition(Petition petition);

}
