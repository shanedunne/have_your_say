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
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) {
        System.out.println("Received request to create user: " + user.toString());

        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String dateOfBirth = user.getDateOfBirth();
        String email = user.getEmail();
        String phoneNumber = user.getPhoneNumber();
        String postcode = user.getPostcode();
        String password = user.getPassword();
        String role = user.getRole();
        String accessCode = user.getAccessCode();

        User isEmailExist = userRepository.findByEmail(email);
        System.out.println("Checking if email exists: " + email);

        if (isEmailExist != null) {
            String token = null;
            String emailExistsString = "Email is already used with another account";
            Boolean emailExistsBoolean = false;
            return new ResponseEntity<>(new AuthResponse(token, emailExistsString, emailExistsBoolean), HttpStatus.CONFLICT);
        }

        User createdUser = new User();
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);
        createdUser.setDateOfBirth(dateOfBirth);
        createdUser.setEmail(email);
        createdUser.setPhoneNumber(phoneNumber);
        createdUser.setPostcode(postcode);
        createdUser.setRole(role);
        createdUser.setAccessCode(accessCode);
        createdUser.setPassword(passwordEncoder.encode(password));

        User savedUser = userRepository.save(createdUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
                savedUser.getPassword());
        try {

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = JwtProvider.generateToken(authentication);
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

        System.out.println(username + "-------" + password);

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);
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
