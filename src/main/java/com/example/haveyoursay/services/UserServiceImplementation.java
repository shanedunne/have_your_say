package com.example.haveyoursay.services;

import com.example.haveyoursay.repositories.UserRepository;


import com.example.haveyoursay.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImplementation implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository=userRepository;
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User findUserProfileByJwt(String jwt) {
        // Implement logic to extract user profile from JWT
        return null;
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
       
        if(user==null) {
            throw new UsernameNotFoundException("User not found with this email"+username);

        }

        
        System.out.println("Loaded user: " + user.getEmail() + ", Role: " + user.getRole());
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities);
    }
}
