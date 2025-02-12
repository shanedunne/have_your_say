package com.example.haveyoursay.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "communities")
public class Community {

    @Id
    private String id;
    private String name;
    private List<String> admins;
    private String communityType;
    private int memberCount;
    private int proposalTimeframeDays;
    private int petitionTimeFrameDays;
    private int petitiionQuotaPercent;
    private int proposalVoteCount;
    private int petitionVoteCount;
    private String mostSupportedProposal;
    private String mostSupportedPetition;
    private String accessCode;

    // Constructors
    public Community() {
        this.admins = new ArrayList<>();
    }

    public Community(String id, String name, List<String> admins, String communityType, int memberCount,
            int proposalVoteCount, int petitionVoteCount, String mostSupportedProposal, String mostSupportedPetition,
            String accessCode) {
        this.id = id;
        this.name = name;
        this.admins = admins != null ? admins : new ArrayList<>();
        this.communityType = communityType;
        this.memberCount = 0;
        this.proposalVoteCount = 0;
        this.petitionVoteCount = 0;
        this.mostSupportedProposal = "";
        this.mostSupportedPetition = "";
        this.accessCode = accessCode;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getAdmins() {
        return admins;
    }

    public void setAdmins(List<String> admins) {
        this.admins = admins;
    }

    public String getCommunityType() {
        return communityType;
    }

    public void setCommunityType(String communityType) {
        this.communityType = communityType;
    }

    public int getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(int memberCount) {
        this.memberCount = memberCount;
    }

    public int getProposalVoteCount() {
        return proposalVoteCount;
    }

    public void setProposalVoteCount(int proposalVoteCount) {
        this.proposalVoteCount = proposalVoteCount;
    }

    public int getPetitionVoteCount() {
        return petitionVoteCount;
    }

    public void setPetitionVoteCount(int petitionVoteCount) {
        this.petitionVoteCount = petitionVoteCount;
    }

    public String getMostSupportedProposal() {
        return mostSupportedProposal;
    }

    public void setMostSupportedProposal(String mostSupportedProposal) {
        this.mostSupportedProposal = mostSupportedProposal;
    }

    public String getMostSupportedPetition() {
        return mostSupportedPetition;
    }

    public void setMostSupportedPetition(String mostSupportedPetition) {
        this.mostSupportedPetition = mostSupportedPetition;
    }

    public String getAccessCode() {
        return accessCode;
    }

    public void setAccessCode(String accessCode) {
        this.accessCode = accessCode;
    }

    public int getProposalTimeframeDays() {
        return proposalTimeframeDays;
    }

    public void setProposalTimeframeDays(int proposalTimeframeDays) {
        this.proposalTimeframeDays = proposalTimeframeDays;
    }

    public int getPetitionTimeFrameDays() {
        return petitionTimeFrameDays;
    }

    public void setPetitionTimeFrameDays(int petitionTimeFrameDays) {
        this.petitionTimeFrameDays = petitionTimeFrameDays;
    }

    public int getPetitiionQuotaPercent() {
        return petitiionQuotaPercent;
    }

    public void setPetitiionQuotaPercent(int petitiionQuotaPercent) {
        this.petitiionQuotaPercent = petitiionQuotaPercent;
    }
}
