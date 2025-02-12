package com.example.haveyoursay.controllers;

import com.example.haveyoursay.repositories.UserRepository;
import com.example.haveyoursay.response.AuthResponse;
import com.example.haveyoursay.services.UserServiceImplementation;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.haveyoursay.services.UserService;
import com.example.haveyoursay.SecurityConfig.JwtProvider;
import com.example.haveyoursay.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.haveyoursay.repositories.CommunityRepository;
import com.example.haveyoursay.models.Community;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImplementation customUserDetails;

    @Autowired
    private UserService userService;

    @Autowired
    private CommunityRepository communityRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> createUserHandler(@RequestBody User user, @RequestParam String accessCode) {
        System.out.println("Received request to create user: " + user.toString());

        Community communityEntity = communityRepository.findByAccessCode(accessCode);
        if (communityEntity == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid access code");
        }

        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String dateOfBirth = user.getDateOfBirth();
        String email = user.getEmail();
        String phoneNumber = user.getPhoneNumber();
        String postcode = user.getPostcode();
        String password = user.getPassword();
        String community = communityEntity.getId();
        String role = "";

        User isEmailExist = userRepository.findByEmail(email);
        System.out.println("Checking if email exists: " + email);

        if (isEmailExist != null) {
            String token = null;
            String emailExistsString = "Email is already used with another account";
            Boolean emailExistsBoolean = false;
            return new ResponseEntity<>(new AuthResponse(token, emailExistsString, emailExistsBoolean),
                    HttpStatus.CONFLICT);
        }

        // check if assigned an admin and apply the approporiate role
        if (communityEntity.getAdmins().contains(email)) {
            role = "ROLE_ADMIN";
        } else {
            role = "ROLE_CITIZEN";
        }

        User createdUser = new User();
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);
        createdUser.setDateOfBirth(dateOfBirth);
        createdUser.setEmail(email);
        createdUser.setPhoneNumber(phoneNumber);
        createdUser.setPostcode(postcode);
        createdUser.setRole(role);
        createdUser.setCommunity(communityEntity.getId());
        createdUser.setPassword(passwordEncoder.encode(password));

        // add to members list and increment the community user count
        communityEntity.getMembers().add(user.getId());
        communityEntity.setMemberCount(communityEntity.getMemberCount() + 1);
        communityRepository.save(communityEntity);

        // get the community name for passing to the jwt
        String communityName = communityEntity.getName();

        User savedUser = userRepository.save(createdUser);
        System.out.println("Saved user: " + savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
                savedUser.getPassword());
        try {

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = JwtProvider.generateToken(authentication, community, role, communityName);
            String successMessage = "Registration was successful";
            Boolean regBoolean = true;
            return new ResponseEntity<AuthResponse>(new AuthResponse(token, successMessage, regBoolean), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<AuthResponse>(
                    new AuthResponse(null, "Token generation failed", false),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // get the user by email
        User user = userRepository.findByEmail(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        // get user role
        String role = user.getRole();

        // get the community id from the user
        String communityId = user.getCommunity();

        // get the community from the community id
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        System.out.println("Community retrieved: " + community);

        // get the community name from the community object
        String communityName = community.getName();
        System.out.println("Community Name: " + community.getName());


        // create the jwt with community id, role and community name encoded
        String token = JwtProvider.generateToken(authentication, communityId, role, communityName);
        String loginSuccess = "Login was successful";
        Boolean loginStatus = true;

        return new ResponseEntity<>(new AuthResponse(token, loginSuccess, loginStatus), HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {

        System.out.println(username + "---++----" + password);

        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        System.out.println("Sig in in user details" + userDetails);

        if (userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);

            throw new BadCredentialsException("Invalid email address and password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch" + userDetails);

            throw new BadCredentialsException("Invalid password");

        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }

}
