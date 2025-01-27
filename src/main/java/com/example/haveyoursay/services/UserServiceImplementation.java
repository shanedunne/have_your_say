package com.example.haveyoursay.services;

import com.example.haveyoursay.repositories.UserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;

import com.example.haveyoursay.SecurityConfig.JwtConstant;
import com.example.haveyoursay.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.crypto.SecretKey;

@Service
public class UserServiceImplementation implements UserService, UserDetailsService {

    // Get secret key
    static SecretKey key = Keys.hmacShaKeyFor(System.getenv("JWT_SECRET_KEY").getBytes());

    @Autowired
    private UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User findUserProfileByJwt(String jwt) {
        try {
            Claims claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(jwt)
            .getPayload();
            String email = claims.get("email", String.class);
            System.out.println("Extracted email from JWT: " + email);

            return userRepository.findByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Invalid JWT");
            return null;
        }
        
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        System.out.println(user);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with this email" + username);

        }

        System.out.println("Loaded user: " + user.getEmail() + ", Role: " + user.getRole());
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities);
    }
}
