import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Task } from './task.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'My Angular 2 implementation';
  tasks = [];

  constructor(private _appService: AppService, private _fb: FormBuilder){}
  
  public myForm: FormGroup;

  ngOnInit() {
    this._appService.getTasks()
      .subscribe(resTasksData => this.tasks = resTasksData);
    
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      date: ['', [Validators.required, Validators.minLength(1)]],
      assigned: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  save(model: Task) {
    this.tasks.unshift(model);
    
    //cannot save new array to json without needing a web server (or simulate w json-server)
    // this._appService.putNewTask(this.tasks)
    //   .subscribe(resTasksData => this.tasks = resTasksData);
  }

  remove(dataIndex) {
    this.tasks.splice(dataIndex, 1);
  }
}