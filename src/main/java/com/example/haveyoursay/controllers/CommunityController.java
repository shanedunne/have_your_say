package com.example.haveyoursay.controllers;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.haveyoursay.models.Community;
import com.example.haveyoursay.models.Petition;
import com.example.haveyoursay.models.Proposal;
import com.example.haveyoursay.repositories.CommunityRepository;
import com.example.haveyoursay.repositories.PetitionRepository;
import com.example.haveyoursay.repositories.ProposalRepository;

import com.example.haveyoursay.models.User;
import com.example.haveyoursay.services.CommunityServiceImplementation;
import com.example.haveyoursay.services.UserServiceImplementation;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @Autowired
    private CommunityServiceImplementation communityServiceImplementation;

    @Autowired
    private PetitionRepository petitionRepository;

    @Autowired
    private ProposalRepository proposalRepository;

    @PostMapping("/create")
    public ResponseEntity<?> CreateCommunity(@RequestBody Community community,
            @RequestHeader("Authorization") String token) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        String name = community.getName();
        List<String> admins = community.getAdmins();
        String communityType = community.getCommunityType();
        String accessCode = community.getAccessCode();
        int petitiionQuota = community.getPetitiionQuota();
        int petitionTimeframe = community.getPetitionTimeframe();
        int proposalTimeframe = community.getProposalTimeframe();

        Community createdCommunity = new Community();
        createdCommunity.setName(name);
        createdCommunity.setAdmins(admins);
        createdCommunity.setCommunityType(communityType);
        createdCommunity.setAccessCode(accessCode);
        createdCommunity.setPetitiionQuota(petitiionQuota);
        createdCommunity.setPetitionTimeframe(petitionTimeframe);
        createdCommunity.setProposalTimeframe(proposalTimeframe);

        try {
            Community savedCommunity = communityRepository.save(createdCommunity);
            System.out.println("Created community: " + name);

            return ResponseEntity.ok(savedCommunity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating community");
        }

    }

    @GetMapping("stats")
    public Map<String, Object> getCommunityStats(@RequestParam String communityId) {

        // declare the map for passing to the front end
        Map<String, Object> stats = new HashMap<>();
        Community community = communityServiceImplementation.getCommunityById(communityId);

        stats.put("memberCount", community.getMemberCount());
        stats.put("proposalTimeframe", community.getProposalTimeframe());
        stats.put("petitionTimeframe", community.getPetitionTimeframe());
        stats.put("petitionQuota", community.getPetitiionQuota());
        stats.put("proposalVoteCount", community.getProposalVoteCount());
        stats.put("petitionVoteCount", community.getPetitionVoteCount());

        // get info on petitions
        List<Petition> petitions = petitionRepository.findAll();
        List<Petition> communityPetitions = new ArrayList<Petition>();

        // get all petitions for this community
        for (Petition petition : petitions ) {
            if(petition.getId().equals(communityId)) {
                communityPetitions.add(petition);
            }            
        }

        // initialise a new mapping to handle category tallys
        Map<String, Integer> categoryStats = new HashMap<>();

        // intialise approved petitions count
        int approvedPetition  = 0;
        
        // loop through community petitions
        for (Petition petition : communityPetitions) {
            if(categoryStats.containsKey(petition.getCategory())){
                categoryStats.put(petition.getCategory(), categoryStats.get(petition.getCategory()) + 1);

            } else {
                categoryStats.put(petition.getCategory(), 1);
            }
            
            if(petition.getStatus().equals("Closed - Petition Supported")) {
                approvedPetition = approvedPetition + 1;
            }
        }

        // add stat to return mapping
        stats.put("petitionCategoryTally", categoryStats);
        stats.put("approvedPetitions", approvedPetition);

        // get info on proposals
        List<Proposal> proposals = proposalRepository.findAll();
        List<Proposal> communityProposals = new ArrayList<Proposal>();

        // get all proposals for this community
        for (Proposal proposal : proposals ) {
            if(proposal.getId().equals(communityId)) {
                communityProposals.add(proposal);
            }            
        }

        // intialise approved proposal count
        int approvedProposal  = 0;
        
        // loop through community proposal
        for (Proposal proposal : communityProposals) {
            
            if(proposal.getStatus().equals("Closed - Passed")) {
                approvedProposal = approvedProposal + 1;
            }
        }

        // add stat to return mapping
        stats.put("approvedProposal", approvedProposal);


        return stats;
    }

}
