package com.example.tsm.dtos;

import lombok.Data;

@Data
public class CategorieDTO {

    private Long id;
    private String type;

    private UserDTO userDTO;


}
