package com.example.tsm.services;

import com.example.tsm.dtos.SignUpRequest;
import com.example.tsm.dtos.UserDTO;
import com.example.tsm.models.User;
import com.example.tsm.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setName(signUpRequest.getName());
        user.setUsername(signUpRequest.getUsername());
        user.setPhone(signUpRequest.getPhone());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequest.getPassword()));
        User createdUser = userRepository.save(user);
         UserDTO userDTO = new UserDTO();
         userDTO.setEmail(createdUser.getEmail());
         userDTO.setName(createdUser.getName());
         userDTO.setUsername(createdUser.getUsername());
         userDTO.setPhone(createdUser.getPhone());
         return userDTO;
    }
}
