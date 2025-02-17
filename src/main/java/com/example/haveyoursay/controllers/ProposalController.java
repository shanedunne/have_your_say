package com.example.haveyoursay.controllers;

import com.example.haveyoursay.models.Community;
import com.example.haveyoursay.models.Petition;
import com.example.haveyoursay.models.Proposal;
import com.example.haveyoursay.repositories.CommunityRepository;
import com.example.haveyoursay.repositories.PetitionRepository;
import com.example.haveyoursay.repositories.ProposalRepository;
import com.example.haveyoursay.services.ProposalServiceImplementation;

import com.example.haveyoursay.models.User;
import com.example.haveyoursay.services.UserServiceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/proposal")
public class ProposalController {
    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private PetitionRepository petitionRepository;

    @Autowired
    private ProposalServiceImplementation proposalServiceImplementation;

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @Autowired
    private CommunityRepository communityRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createProposal(@RequestBody Proposal proposal,
            @RequestHeader("Authorization") String token) {
        System.out.println("Received request to create proposal: " + proposal.toString());

        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        // handle getting community data when creating petition
        String communityId = user.getCommunity();

        // get community object for retreiving data from it
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        System.out.println("Community retrieved: " + community);

        String title = proposal.getTitle();
        String category = proposal.getCategory();
        String body = proposal.getBody();
        Long startTime = proposal.getStartTime();
        Long closeTime = proposal.getCloseTime();
        String petitionId = proposal.getPetitionId();

        Proposal createdProposal = new Proposal();
        createdProposal.setTitle(title);
        createdProposal.setCategory(category);
        createdProposal.setBody(body);
        createdProposal.setStartTime(startTime);
        createdProposal.setCloseTime(closeTime);
        createdProposal.setPetitionId(petitionId);
        createdProposal.setUserId(user.getId());
        createdProposal.setCommunity(user.getCommunity());
        createdProposal.setStatus("open soon");
        createdProposal.setParticipantsAtStart(community.getMemberCount());

        // set eligible voters at time of proposal creation
        // only members signed up when proposal created can vote
        createdProposal.setEligibleVoters(community.getMembers());

        try {
            Proposal savedProposal = proposalRepository.save(createdProposal);
            System.out.println("Saved Proposal: " + savedProposal);

            // add proposal id to the petition
            Petition petition = petitionRepository.findById(petitionId).orElse(null);
            if (petition == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Petition not found");
            }

            // set proposal id and save
            petition.setProposalId(savedProposal.getId());
            petitionRepository.save(petition);

            return ResponseEntity.ok(savedProposal);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating proposal");
        }

    }

    // get all proposals
    @GetMapping("/get")
    public ResponseEntity<?> getAllProposals() {
        try {
            List<Proposal> allProposals = proposalRepository.findAll();
            return ResponseEntity.ok(allProposals);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching proposals");
        }

    }

    // get open proposals of for given community
    @GetMapping("/getOpen")
    public ResponseEntity<?> getOpenProposals(@RequestHeader("Authorization") String token, @RequestParam Long now) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        String community = user.getCommunity();

        // check to ensure all open proposals are within their timeframe.
        try {
            List<Proposal> openProposals = proposalRepository.findByCommunityAndStatuses(community,
                    List.of("open", "open soon"));
            for (Proposal proposal : openProposals) {

                // if proposal end time is reached, calculate outcome and set status
                if (proposal.getCloseTime() < now) {
                    if (proposal.getSupportVotes() > proposal.getOpposeVotes()) {
                        proposal.setStatus("Passed");
                    } else {
                        proposal.setStatus("Rejected");
                    }
                    proposalRepository.save(proposal);

                } else if (proposal.getStartTime() > now) {
                    // if proposal hasnt started yet, set status as open soon
                    if (!"open soon".equals(proposal.getStatus())) {
                        proposal.setStatus("open soon");
                        proposalRepository.save(proposal);
                    }

                } else if (proposal.getStartTime() <= now && proposal.getCloseTime() > now) {
                    // if proposal start time has been reached and end time not reached, set to open
                    if (!"open".equals(proposal.getStatus())) {
                        proposal.setStatus("open");
                        proposalRepository.save(proposal);
                    }
                }
            }
            // return proposals that are open and opening soon
            List<Proposal> updatedProposals = proposalRepository.findByCommunityAndStatuses(community,
                    List.of("open", "open soon"));
            return ResponseEntity.ok(updatedProposals);

        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching petitions");
        }

    }

    // get closed petitions
    @GetMapping("/getClosed")
    public ResponseEntity<?> getClosedProposals(@RequestHeader("Authorization") String token) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        String community = user.getCommunity();
        try {
            List<Proposal> OpenProposals = proposalRepository.findByCommunityAndStatusNotIn(community,
                    List.of("open", "open soon"));
            return ResponseEntity.ok(OpenProposals);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching petitions");
        }

    }

    @GetMapping("/{id}")
    public Proposal getProposalById(@PathVariable String id) {
        Proposal proposal = proposalServiceImplementation.getProposalById(id);
        return proposal;
    }

    @GetMapping("checkHasVoted")
    public Boolean checkHasVoted(@RequestHeader("Authorization") String token, @RequestParam String proposalId) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return false;
        }

        if (user.getProposalsVotedOn().contains(proposalId)) {
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/vote")
    public ResponseEntity<?> proposalVote(@RequestHeader("Authorization") String token, @RequestParam String decision,
            @RequestParam String proposalId) {

        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        System.out.println("User email from proposal page: " + user.getEmail());

        try {
            // Add petition id to the users records
            Proposal proposal = proposalServiceImplementation.getProposalById(proposalId);
            System.out.println("This is the proposal" + proposal.getTitle());
            proposal.setVotedCount(proposal.getVotedCount() + 1);
            System.out.println("just updated votedcOUNT");

            // if voter is not eligible to vote, return
            if (!proposal.getEligibleVoters().contains(user.getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User cannot vote on this proposal");
            }

            // if user has voted already, return
            if (user.getProposalsVotedOn().contains(proposalId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User has already voted on this proposal");
            }

            // if decision is to support, increment support votes count and vote standing
            if (decision.equals("support")) {
                System.out.println("PROPOSAL DECISION IS SUPPORT");

                proposal.setSupportVotes(proposal.getSupportVotes() + 1);
                proposal.setVoteStanding(proposal.getVoteStanding() + 1);

                // if decision is to oppose, increment opposed votes count and decrement vote
                // standing
            } else if (decision.equals("oppose")) {
                System.out.println("PROPOSAL DECISION IS OPPOSE");

                proposal.setOpposeVotes(proposal.getOpposeVotes() + 1);
                proposal.setVoteStanding(proposal.getVoteStanding() - 1);
            }

            // add petition to users voting records
            user.getProposalsVotedOn().add(proposalId);
            userServiceImplementation.updateUser(user);
            System.out.println("User updated successfully: " + user);

            // check if latest vote has caused the inevitable of either a guaranteed support
            // or guaranteed fail
            if (proposal.getSupportVotes() > (Math.round(proposal.getParticipantsAtStart() / 2) + 1)) {
                proposal.setStatus("Closed - Proposal Supported");
            } else if (proposal.getOpposeVotes() > (Math.round(proposal.getParticipantsAtStart() / 2) + 1)) {
                proposal.setStatus("Closed - Proposal Opposed");
            }

            proposalServiceImplementation.updateProposal(proposal);
            System.out.println("Proposal saved successfully: " + proposal);

            return ResponseEntity.ok(proposal);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occured");
        }

    }

    // Check id the user is elligable to vote on this proposal
    @GetMapping("checkIfEligible")
    public Boolean checkIfEligible(@RequestHeader("Authorization") String token, @RequestParam String proposalId) {
        // remove prefix from token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // call implenetation method to get user from token
        User user = userServiceImplementation.findUserProfileByJwt(token);
        if (user == null) {
            return false;
        }

        Proposal proposal = proposalServiceImplementation.getProposalById(proposalId);

        if (proposal.getEligibleVoters().contains(user.getId())) {
            return true;
        } else {
            return false;
        }
    }

}
