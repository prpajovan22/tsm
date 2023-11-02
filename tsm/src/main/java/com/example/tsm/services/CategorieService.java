package com.example.tsm.services;

import com.example.tsm.models.Categorie;
import com.example.tsm.repositorys.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    public List<Categorie> allCategories(){
        return categorieRepository.findAll();
    }

    public Categorie findById(Long id){
        return categorieRepository.findById(id).orElse(null);
    }

    public Categorie save(Categorie categorie){
        return categorieRepository.save(categorie);
    }

    public void delete(Long id){
        categorieRepository.deleteById(id);
    }
}
