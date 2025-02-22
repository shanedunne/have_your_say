package com.example.haveyoursay.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String email;
    private String phoneNumber;
    private String postcode;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String role;
    private String community;
    private List<String> petitionsVotedOn = new ArrayList<>();
    private List<String> proposalsVotedOn = new ArrayList<>();
    

    
    // get and set ID
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    // get and set first name
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // get and set last name
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

     // get and set date of birth
     public String getDateOfBirth() {
        return dateOfBirth;
    }
    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    // get and set email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // get and set phone number
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // get and set postcode
    public String getPostcode() {
        return postcode;
    }
    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    // get and set password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    // get and set role
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    // get and set role
    public String getCommunity() {
        return community;
    }
    public void setCommunity(String community) {
        this.community = community;
    }

    public List<String> getPetitionsVotedOn() {
        return petitionsVotedOn;
    }

    public void setPetitionsVotedOn(List<String> petitionsVotedOn) {
        this.petitionsVotedOn = petitionsVotedOn;
    }

    public List<String> getProposalsVotedOn() {
        return proposalsVotedOn;
    }

    public void setProposalsVotedOn(List<String> proposalsVotedOn) {
        this.proposalsVotedOn = proposalsVotedOn;
    }
    
}