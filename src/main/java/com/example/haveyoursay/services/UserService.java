package com.example.haveyoursay.services;

import com.example.haveyoursay.models.User;
import java.util.List;

public interface UserService {
    public List<User> getAllUser();
     
     public User findUserProfileByJwt(String jwt);
     
     public User findUserByEmail(String email);
     
     public User findUserById(String userId);

     public void updateUser(User user);

}
