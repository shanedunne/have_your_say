package com.example.haveyoursay.services;

import org.springframework.stereotype.Service;

import com.example.haveyoursay.models.Community;
import com.example.haveyoursay.repositories.CommunityRepository;

@Service
public class CommunityServiceImplementation implements CommunityService {

    private CommunityRepository communityRepository;

    public CommunityServiceImplementation(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    @Override
    public Community getCommunityById(String communityId) {
        System.out.println("getting community from service implementation: " + communityId);
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community == null) {
            System.err.println("no community found " + communityId);
        } else {
            System.out.println("Found community with title: " + community.getName());
        }
        return community;
    }

}
