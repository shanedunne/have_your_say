package com.example.haveyoursay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.haveyoursay.repositories.UserRepository;

@SpringBootApplication
@EnableMongoRepositories
public class HaveYourSayApplication {

	@Autowired
	UserRepository userRepository;
	public static void main(String[] args) {
		SpringApplication.run(HaveYourSayApplication.class, args);
	}

}
