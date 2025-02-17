package com.example.haveyoursay.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.haveyoursay.models.Petition;

@Repository
public interface PetitionRepository extends MongoRepository<Petition,String> {
    List<Petition> findByCommunityAndStatus(String community, String status);
    List<Petition> findByCommunityAndStatusNot(String community, String status);
    
    // get future proposals
    @Query("{'proposalId': '', 'status': ?0}")
    List<Petition> findFutureProposals(String status);

    List<Petition> findByCommunityId(String communityId);

}



