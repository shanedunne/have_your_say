package com.example.haveyoursay.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.haveyoursay.models.PetitionVotes;

@Repository
public interface PetitionVotesRepository extends MongoRepository<PetitionVotes,String>{
    
}



