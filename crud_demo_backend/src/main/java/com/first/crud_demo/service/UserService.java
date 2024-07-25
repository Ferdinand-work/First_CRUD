package com.first.crud_demo.service;


import com.first.crud_demo.dto.UserTO;
import com.first.crud_demo.model.User;
import com.first.crud_demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public String addUser(UserTO userTO)
    {
        try {
            User usr = User.builder()
                    .name(userTO.getName())
                    .email(userTO.getEmail())
                    .password(userTO.getPassword())
                    .build();
            userRepository.save(usr);
        }catch (Exception e)
        {
            // Handle exception
        }
        return "User created successfully";
    }

    public boolean authenticate(UserTO userTO)
    {
        try {
            User usr = userRepository.findByEmail(userTO.getEmail());
            return usr != null && usr.getPassword().equals(userTO.getPassword());
        }catch (Exception e)
        {
            // Handle exception
        }
        return false;
    }

}
