package com.example.haveyoursay.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.haveyoursay.models.Community;

@Repository
public interface CommunityRepository extends MongoRepository<Community, String> {
    @Query("{'accessCode': ?0}")
    Community findByAccessCode(String accessCode);

}
