package com.example.haveyoursay.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Date;


@Document(collection = "petitionVotes")
@AllArgsConstructor
@NoArgsConstructor
public class PetitionVotes {

    @Id
    private String id;
    private String region;
    private int participantsAtStart; // count of eligible voters
    private int quota; // quota to reach
    private int votedCount; // Total number of votes cast
    private int supportVotes; // votes in support
    private int opposeVotes; // votes that oppose
    private int voteStanding; // supportVotes - opposeVotes
    private String status; // open, closedSupported, closedOpposed
    private Date lastUpdated; // time of last vote

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public int getParticipantsAtStart() {
        return participantsAtStart;
    }

    public void setParticipantsAtStart(int participantsAtStart) {
        this.participantsAtStart = participantsAtStart;
    }

    public int getQuota() {
        return quota;
    }

    public void setQuota(int quota) {
        this.quota = quota;
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

}
