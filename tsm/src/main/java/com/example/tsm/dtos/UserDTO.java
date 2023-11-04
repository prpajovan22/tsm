package com.example.tsm.dtos;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;

    private String name;

    private String username;

    private String email;

    private String phone;

    private String password;

    private String avatar;
}
