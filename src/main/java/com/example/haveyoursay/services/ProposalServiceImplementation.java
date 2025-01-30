package com.example.haveyoursay.services;

import org.springframework.stereotype.Service;

import com.example.haveyoursay.models.Proposal;
import com.example.haveyoursay.repositories.ProposalRepository;
import java.util.Optional;

@Service
public class ProposalServiceImplementation implements ProposalService {

    private ProposalRepository proposalRepository;

    public ProposalServiceImplementation(ProposalRepository proposalRepository) {
        this.proposalRepository = proposalRepository;
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
    public void updateProposal(Proposal proposal) {
        proposalRepository.save(proposal);
    }

}
