import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  @Input() taskToEdit?: Task; 

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.taskToEdit) {
      this.taskForm.patchValue(this.taskToEdit);
    }
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      if (this.taskToEdit) {
        this.taskService.updateTask({ ...this.taskToEdit, ...this.taskForm.value }).subscribe(() => {
          this.taskForm.reset();
        });
      } else {
        this.taskService.addTask(this.taskForm.value).subscribe(() => {
          this.taskForm.reset();
        });
      }
    }
  }
}
