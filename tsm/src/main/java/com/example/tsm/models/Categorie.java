package com.example.tsm.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "categorie")
@Data
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;
}
