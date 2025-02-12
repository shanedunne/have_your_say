package com.example.haveyoursay.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.haveyoursay.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    @Query("{email :?0}")
    User findByEmail(String email);

    @Query("{'community': ?0}")
    List<User> findByCommunity(String communityId);

}
