package com.example.haveyoursay.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.haveyoursay.models.Proposal;

@Repository
public interface ProposalRepository extends MongoRepository<Proposal,String> {
    List<Proposal> findByCommunityAndStatus(String community, String status);
    List<Proposal> findByCommunityAndStatusNot(String community, String status);

    // get proposals by community and multiple statuses
    @Query("{ 'community': ?0, 'status': { $in: ?1 } }")
    List<Proposal> findByCommunityAndStatuses(String community, List<String> statuses);


}



