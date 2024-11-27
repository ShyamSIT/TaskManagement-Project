import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-task-master',
  templateUrl: './task-master.component.html',
  styleUrl: './task-master.component.scss'
})
export class TaskMasterComponent implements OnInit {
  
  taskForm : FormGroup = this.fb.group({});

  constructor(
    public modalRef: NgbActiveModal,
    private fb : FormBuilder,
    private apiUrl : ApiUrlHelper,
    private commonService : CommonService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.initialForm()
  }

  initialForm(){
    this.taskForm = this.fb.group({
      taskName: ['',Validators.required],
      taskDescription: ['',Validators.required],
      deadline: ['',Validators.required]
    });
  }

  saveTask(){
    const apiUrl = this.apiUrl.apiUrl.teacher.addUpdateTask

    const objData = {
      TaskName : this.taskForm.value.taskName,
      Description : this.taskForm.value.taskDescription,
      Deadline : this.taskForm.value.deadline,
      UserId : this.storageService.getValue('UserId'),
    }
    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe((data) => {
        console.log(data.Data); 
      })
  }
}
