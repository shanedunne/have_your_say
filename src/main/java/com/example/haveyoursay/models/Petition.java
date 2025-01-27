package com.example.haveyoursay.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "petitions")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Petition {

    @Id
    private String id;
    private String title;
    private String category;
    private String body;
    private Long startTime;
    private Long closeTime;
    private String userId;
    private String region;
    private int participantsAtStart; // count of eligible voters
    private int quota; // quota to reach
    private int votedCount; // Total number of votes cast
    private int supportVotes; // votes in support
    private int opposeVotes; // votes that oppose
    private int voteStanding; // supportVotes - opposeVotes
    private String status; // open, closedSupported, closedOpposed
    private Date lastUpdated; // time of last vote

    // constructor
    public Petition(String id, String title, String category, String body, Long startTime, Long closeTime, String userId, String region, int participantsAtStart, int quota) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.body = body;
        this.startTime = startTime;
        this.closeTime = closeTime;
        this.userId = userId;
        this.region = region;
        this.participantsAtStart = participantsAtStart;
        this.quota = quota;
        this.votedCount = 0;
        this.supportVotes = 0;
        this.opposeVotes = 0;
        this.voteStanding = 0;
        this.status = "open";
        this.lastUpdated = new Date(); // Set the current date/time
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

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(Long closeTime) {
        this.closeTime = closeTime;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
