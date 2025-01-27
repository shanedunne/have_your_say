package com.example.haveyoursay.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.haveyoursay.models.Petition;

@Repository
public interface PetitionRepository extends MongoRepository<Petition,String> {
}



