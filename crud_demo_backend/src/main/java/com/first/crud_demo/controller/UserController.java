package com.first.crud_demo.controller;
import com.first.crud_demo.dto.UserTO;
import com.first.crud_demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/usr")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {
    private String jwtSecret = "{JWT_SECRET}";

    @Autowired
    private UserService userService;

    @PostMapping("/adduser")
    @ResponseStatus(HttpStatus.CREATED)
    public String addUser(@RequestBody UserTO usr){
        return userService.addUser(usr);
    }

    @PostMapping("/auth/login")
    @ResponseStatus(HttpStatus.OK)
    public String authenticate(@RequestBody UserTO usr) {
        boolean isAuthenticated = userService.authenticate(usr);
        System.out.println(isAuthenticated ? "Success" : "Fail");

        if (isAuthenticated) {
            // Generate JWT token
            return jwtSecret;
        }
        return "";
    }
}
