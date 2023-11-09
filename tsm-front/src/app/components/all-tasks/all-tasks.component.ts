import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  tasks:Task[] = [];
  task : any;

  constructor(private taskService:TaskService,private route:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(task => {
      this.tasks = task;
    });
  }

}
