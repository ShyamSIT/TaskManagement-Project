import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { TaskModel } from 'src/app/core/model/task-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-task-master',
  templateUrl: './task-master.component.html',
  styleUrl: './task-master.component.scss'
})
export class TaskMasterComponent implements OnInit {
  taskForm: FormGroup = this.fb.group({});
  TaskId = 0;
  @Input() data: any;
  task: TaskModel = {
    TaskId: 0,
    TaskName: '',
    Description: '',
    Deadline: new Date(),
    UserId: 0,
    Priority: ' '
  };
  formSubmitted : boolean = false

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private apiUrl: ApiUrlHelper,                                             
    private commonService: CommonService,
    private storageService: StorageService,
    private router : Router
  ) {}                                                                                                      

  ngOnInit(): void {
    this.TaskId = this.data || 0;                                                                                                                                           

    this.initialForm();
    if (this.TaskId > 0) {
      this.getTaskByTaskId(this.TaskId);
    } else
     console.log('called addd');
  }

  initialForm() {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      deadline: ['', Validators.required],
      priority : ['', Validators.required]
    });
  }

  saveTask() {
    const jwttoken = this.storageService.getValue('JwtToken')
    if(!jwttoken){
      this.modalRef.close();
      this.router.navigate(['/auth/login'])
      return
    }

    this.formSubmitted = true;
    if(!this.taskForm.valid) {
      return
    }
    const apiUrl = this.apiUrl.apiUrl.teacher.addUpdateTask;

    const objData = {
      TaskId: this.TaskId,
      TaskName: this.taskForm.value.taskName,
      Description: this.taskForm.value.taskDescription,
      Deadline: this.taskForm.value.deadline,
      UserId: this.storageService.getValue('UserId'),
      Priority : this.taskForm.value.priority
    };
    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe((data) => {
        this.formSubmitted = false
        console.log(data.Data);
      });
    
    this.modalRef.close();
  }

  getTaskByTaskId(taskId : any) {
    const apiUrl = this.apiUrl.apiUrl.teacher.getTaskByTaskId + '?TaskId=' + taskId;
    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success && data.Data) {
            this.task = data.Data;
            this.task.Deadline = this.task.Deadline.toString().split('T')[0];
            this.taskForm.patchValue({
              deadline: this.task.Deadline,
              priority : this.task.Priority
            });
          }
        }
      });
  }
}
