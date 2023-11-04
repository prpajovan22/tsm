package com.example.tsm.repositorys;

import com.example.tsm.models.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategorieRepository extends JpaRepository<Categorie,Long> {

    @Query("SELECT c FROM Categorie c WHERE c.user.user_id = :userId")
    List<Categorie> findByUserId(Long userId);
}
