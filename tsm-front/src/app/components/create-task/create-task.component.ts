import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  createTask(task: Task): Observable<any> {
    const formData = new FormData();
    formData.append('title', task.title);
    formData.append('description', task.description);
    task.dueDate = new Date();
    formData.append('dueDate', task.dueDate ? task.dueDate.toISOString() : '');
    console.log(this.selectedCategories)
    if (this.selectedCategories) {

      formData.append('categories', JSON.stringify(this.selectedCategories));  
    }

    return this.taskService.createTask(formData);
  }
  onSubmit(): void {
  this.createTask(this.tasks).subscribe(
    data => {
      console.log(data);
      this.tasks = new Task();
      this.selectedCategories = [];
      this.redirectToAllTasks();
    },
    error => console.log(error)
  );
}

  redirectToAllTasks(){
    this.route.navigate(['/tasks'])
  }

}
