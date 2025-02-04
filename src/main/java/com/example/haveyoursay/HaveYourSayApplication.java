package com.example.haveyoursay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.haveyoursay.repositories.UserRepository;
import com.example.haveyoursay.repositories.PetitionRepository;
import com.example.haveyoursay.repositories.ProposalRepository;

@SpringBootApplication
@EnableMongoRepositories
public class HaveYourSayApplication {

	@Autowired
	UserRepository userRepository;
	PetitionRepository petitionRepository;
	ProposalRepository proposalRepository;
	public static void main(String[] args) {
		SpringApplication.run(HaveYourSayApplication.class, args);
	}

}
