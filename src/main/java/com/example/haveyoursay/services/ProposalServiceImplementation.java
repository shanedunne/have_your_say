package com.example.haveyoursay.services;

import org.springframework.stereotype.Service;

import com.example.haveyoursay.models.Proposal;
import com.example.haveyoursay.repositories.ProposalRepository;
import java.util.Optional;

@Service
public class ProposalServiceImplementation implements PetitionService {

    private ProposalRepository proposalRepository;

    public ProposalServiceImplementation(ProposalRepository proposalRepository) {
        this.proposalRepository = proposalRepository;
    }

    @Override
    public Long getPetitionCloseTime(Long petitionStartTime) {
        // add 7 days to the petition start time
        Long petitionCloseTime = petitionStartTime + 604800000;
        return petitionCloseTime;
    }

    @Override
    public Proposal getProposalById(String id) {
        System.out.println("getting proposal from service implementation: " + id);
        Proposal proposal = proposalRepository.findById(id).orElse(null);
        if (proposal == null) {
            System.err.println("no proposal found " + id);
        } else {
            System.out.println("Found proposal with title: " + proposal.getTitle());
        }
        return proposal;
    }

    @Override
    public void updatePetition(Proposal proposal) {
        proposal.save(proposal);
    }

}
