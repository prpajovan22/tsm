package com.example.tsm.controllers;

import com.example.tsm.models.Categorie;
import com.example.tsm.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorie")
@CrossOrigin(origins = "http://localhost:4200")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @GetMapping("/all")
    private List<Categorie> findAll(){
        return categorieService.allCategories();
    }

    @PostMapping("/create")
    public ResponseEntity<Categorie> createCategorie(@RequestParam("type") String type) {
        Categorie categorie = new Categorie();
        categorie.setType(type);
        categorieService.save(categorie);
        return ResponseEntity.ok().build();
    }
}
