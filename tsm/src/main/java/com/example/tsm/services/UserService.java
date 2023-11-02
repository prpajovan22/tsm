package com.example.tsm.services;

import com.example.tsm.dtos.UserDTO;
import com.example.tsm.models.User;
import com.example.tsm.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public UserDTO getUserProfileByEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getUser_id());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhone(user.getPhone());
            userDTO.setName(user.getName());
            userDTO.setAvatar(user.getAvatar());

            return userDTO;
        }
        return null;
    }

}
