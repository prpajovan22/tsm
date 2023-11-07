package com.example.tsm.controllers;

import com.example.tsm.dtos.UserDTO;
import com.example.tsm.models.User;
import com.example.tsm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ResourceLoader resourceLoader;


    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserProfile(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            UserDTO userDTO = userService.getUserProfileByEmail(userEmail);
            if (userDTO != null) {
                return ResponseEntity.ok(userDTO);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(
            Authentication authentication,
            @RequestPart("name") String name,
            @RequestPart("email") String email,
            @RequestPart("phone") String phone,
            @RequestParam(value = "avatar", required = false) MultipartFile avatarFile) throws IOException {

        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            UserDTO userDTO = userService.getUserProfileByEmail(userEmail);
            if (userDTO != null) {
                if (!name.equals(userDTO.getName())) {
                    userDTO.setUsername(name);
                }

                if (!email.equals(userDTO.getEmail())) {
                    userDTO.setEmail(email);
                }

                if (!phone.equals(userDTO.getPhone())) {
                    userDTO.setPhone(phone);
                }

                String filePath = null;
                if (avatarFile != null && !avatarFile.isEmpty()) {
                    try {
                        filePath = saveFile(avatarFile);
                        userDTO.setAvatar(filePath);
                    } catch (IOException e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error saving the avatar file.");
                    }
                }
                userDTO.setPassword(userDTO.getPassword());

                User user = convertUserDTOToUser(userDTO);
                User updated = userService.save(user);

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    public User convertUserDTOToUser(UserDTO userDTO) {
        User user = new User();
        user.setUser_id(userDTO.getId());
        user.setName(userDTO.getName());
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setAvatar(userDTO.getAvatar());
        return user;
    }

    private String getResourcesFolderPath() {
        Resource resource = resourceLoader.getResource("classpath:");
        try {
            return resource.getFile().getAbsolutePath();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        String resourcesFolderPath = getResourcesFolderPath();
        if (resourcesFolderPath != null) {
            try {
                Path imagesFolderPath = Paths.get(resourcesFolderPath, "images");
                if (!Files.exists(imagesFolderPath)) {
                    Files.createDirectories(imagesFolderPath);
                }

                Path filePath = Paths.get(imagesFolderPath.toString(), file.getOriginalFilename());
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                return filePath.toString();
            } catch (IOException e) {
                throw new IOException("Error saving the file.");
            }
        } else {
            throw new IOException("Resources folder path is null.");
        }
    }
}
