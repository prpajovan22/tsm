package com.example.tsm.services;

import com.example.tsm.models.Task;
import com.example.tsm.repositorys.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAll(){
        return taskRepository.findAll();
    }

    public Task save(Task task){
        return taskRepository.save(task);
    }
}
