package com.example.haveyoursay.models;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "proposals")
@Data
public class Proposal {

    @Id
    private String id;
    private String title;
    private String category;
    private String body;
    private String petitionId;
    private Long startTime;
    private Long endTime;
    private String userId;
    private String community;
    private int participantsAtStart; // count of eligible voters
    private int votedCount; // Total number of votes cast
    private int supportVotes; // votes in support
    private int opposeVotes; // votes that oppose
    private int voteStanding; // supportVotes - opposeVotes
    private String status; // draft, open, Closed - Passed, Closed - Rejected
    private Date lastUpdated; // time of last vote
    private List<String> eligibleVoters;


    // constructor
    public Proposal(String id, String title, String category, String body, String petitionId, Long startTime, Long endTime, String userId, String community, int participantsAtStart) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.body = body;
        this.petitionId = petitionId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.userId = userId;
        this.community = community;
        this.participantsAtStart = participantsAtStart;
        this.votedCount = 0;
        this.supportVotes = 0;
        this.opposeVotes = 0;
        this.voteStanding = 0;
        this.status = "open";
        this.lastUpdated = new Date();
    }
    
    public Proposal() {
        
    }


    // Getters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getPetitionId() {
        return petitionId;
    }

    public void setPetitionId(String petitionId) {
        this.petitionId = petitionId;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCommunity() {
        return community;
    }

    public void setCommunity(String community) {
        this.community = community;
    }

    public int getParticipantsAtStart() {
        return participantsAtStart;
    }

    public void setParticipantsAtStart(int participantsAtStart) {
        this.participantsAtStart = participantsAtStart;
    }


    public int getVotedCount() {
        return votedCount;
    }

    public void setVotedCount(int votedCount) {
        this.votedCount = votedCount;
    }

    public int getSupportVotes() {
        return supportVotes;
    }

    public void setSupportVotes(int supportVotes) {
        this.supportVotes = supportVotes;
    }

    public int getOpposeVotes() {
        return opposeVotes;
    }

    public void setOpposeVotes(int opposeVotes) {
        this.opposeVotes = opposeVotes;
    }

    public int getVoteStanding() {
        return voteStanding;
    }

    public void setVoteStanding(int voteStanding) {
        this.voteStanding = voteStanding;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

       public List<String> getEligibleVoters() {
        return eligibleVoters;
    }

    public void setEligibleVoters(List<String> eligibleVoters) {
        this.eligibleVoters = eligibleVoters;
    }

}
