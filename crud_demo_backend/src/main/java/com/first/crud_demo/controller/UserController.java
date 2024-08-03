package com.first.crud_demo.controller;
import com.first.crud_demo.dto.UserTO;
import com.first.crud_demo.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/usr")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {

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
            String jwtSecret = "{JWT_SECRET}";
            return Jwts.builder()
                    .setSubject(usr.getEmail())
                    .signWith(SignatureAlgorithm.HS256, jwtSecret.getBytes())
                    .compact();
        }
        return "";
    }
}
