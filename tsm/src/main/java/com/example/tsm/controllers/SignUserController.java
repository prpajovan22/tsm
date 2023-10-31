package com.example.tsm.controllers;

import com.example.tsm.dtos.SignUpRequest;
import com.example.tsm.dtos.UserDTO;
import com.example.tsm.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class SignUserController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody SignUpRequest signUpRequest){
        UserDTO createdUser = authService.createUser(signUpRequest);
        if(createdUser == null){
            return new ResponseEntity<>("User is not created", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
    }
}
