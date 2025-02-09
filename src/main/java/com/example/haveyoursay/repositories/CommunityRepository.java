package com.example.haveyoursay.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.haveyoursay.models.Community;

@Repository
public interface CommunityRepository extends MongoRepository<Community,String> {
    

}
