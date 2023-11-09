import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/Categorie';
import { Task } from 'src/app/model/Task';
import { CategorieService } from 'src/app/service/categorie/categorie.service';
import { TaskService } from 'src/app/service/task/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  task_id:number
  tasks:Task
  selectedCategories: string[] = [];
  categories: Categorie[] = [];

  constructor(private route:Router,private taskService:TaskService,private categoryService:CategorieService) { }

  ngOnInit(): void {
    this.tasks = new Task();
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createTask(): void {
    const formData = new FormData();
    formData.append('type', this.tasks.title);
  
    this.taskService.createTask(formData).subscribe(
      data => {
        console.log(data);
        this.tasks = new Task();
        console.log(this.tasks);
        this.redirectToAllTasks();
      },
      error => console.log(error)
    );
  }
  onSubmit(){
    this.createTask();
  }

  redirectToAllTasks(){
    this.route.navigate(['/tasks'])
  }

}
