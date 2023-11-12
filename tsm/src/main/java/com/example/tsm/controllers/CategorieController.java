package com.example.tsm.controllers;

import com.example.tsm.dtos.CategorieDTO;
import com.example.tsm.dtos.UserDTO;
import com.example.tsm.models.Categorie;
import com.example.tsm.models.User;
import com.example.tsm.services.CategorieService;
import com.example.tsm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/categorie")
@CrossOrigin(origins = "http://localhost:4200")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<Categorie>> findAll(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String loggedInUser = userDetails.getUsername();

            User user = userService.getUserByUsername(loggedInUser);

            if (user != null) {
                List<Categorie> userCategories = categorieService.findCategoriesByUserId(user.getUser_id());
                return ResponseEntity.ok(userCategories);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
        }
    }

    /*@GetMapping("/all")
    private List<Categorie> allCategories(){
        return categorieService.allCategories();
    }*/

    @PostMapping("/create")
    public ResponseEntity<?> createCategorie(@RequestParam("type") String type, Authentication authentication) {
        try {
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                String loggedInUser = userDetails.getUsername();

                User user = userService.getUserByUsername(loggedInUser);

                if (user != null) {
                    Categorie categorie = new Categorie();
                    categorie.setType(type);
                    categorie.setUser(user);

                    categorieService.save(categorie);
                    return ResponseEntity.ok().build();
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<Categorie> getCategorieById(@PathVariable("id")Long id){
        Categorie categorie = categorieService.findById(id);
        if(categorie == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categorie,HttpStatus.OK);
    }

    @PutMapping("/{id}")
    private ResponseEntity<Categorie> updateCategorie(@PathVariable("id")Long id,@RequestParam("type") String type){
        Categorie existingCategorie = categorieService.findById(id);
        if(existingCategorie == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingCategorie.setType(type);

        categorieService.save(existingCategorie);

        return new ResponseEntity<>(existingCategorie,HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    private void deleteCategorie(@PathVariable("id")Long id){
        categorieService.delete(id);
    }
}