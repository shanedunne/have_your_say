package com.example.haveyoursay.services;

import com.example.haveyoursay.models.Proposal;

public interface ProposalService {
    public Long getProposalCloseTime(Long proposalStartTime);
    public Proposal getProposalById(String proposalId);
    public void updateProposal(Proposal proposal);
}
