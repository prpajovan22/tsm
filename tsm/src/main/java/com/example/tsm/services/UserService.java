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
            userDTO.setUsername(user.getUsername());
            userDTO.setPassword(user.getPassword());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhone(user.getPhone());
            userDTO.setName(user.getName());
            userDTO.setAvatar(user.getAvatar());

            return userDTO;
        }
        return null;
    }

    public User getUserByName(String name){
        return userRepository.findByName(name);
    }

    public User getUserByUsername(String username){
        return  userRepository.findByUsername(username);
    }

    public User findById(Long id){
        return userRepository.findById(id).orElse(null);
    }

    public User save(User user){
        return userRepository.save(user);
    }

}
