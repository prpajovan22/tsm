package com.example.tsm.controllers;

import com.example.tsm.models.Categorie;
import com.example.tsm.models.Task;
import com.example.tsm.models.User;
import com.example.tsm.services.TaskService;
import com.example.tsm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/task")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestParam("title") String title, @RequestParam("description") String description,
                                        @RequestParam("dueDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String dueDateString,
                                        @RequestParam("categories") Set<String> categoryStrings, Authentication authentication) {
        try {
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                String loggedInUser = userDetails.getUsername();

                User user = userService.getUserByUsername(loggedInUser);

                if (user != null) {
                    Task task = new Task();
                    task.setTitle(title);
                    task.setDescription(description);
                    LocalDate currentDate = LocalDate.now();
                    task.setCreationDate(currentDate);
                    OffsetDateTime offsetDateTime = OffsetDateTime.parse(dueDateString, DateTimeFormatter.ISO_DATE_TIME);
                    LocalDate dueDate = offsetDateTime.toLocalDate();
                    task.setDueDate(dueDate);
                    Set<Categorie> categories = categoryStrings.stream()
                            .map(categoryType -> {
                                Categorie category = new Categorie();
                                category.setType(category.getType());
                                return category;
                            })
                            .collect(Collectors.toSet());

                    task.setCategories(categories);

                    taskService.save(task);
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
}
