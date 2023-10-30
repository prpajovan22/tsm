package com.example.tsm.services;

import com.example.tsm.dtos.SignUpRequest;
import com.example.tsm.dtos.UserDTO;

public interface AuthService {
    UserDTO createUser(SignUpRequest signUpRequest);
}
