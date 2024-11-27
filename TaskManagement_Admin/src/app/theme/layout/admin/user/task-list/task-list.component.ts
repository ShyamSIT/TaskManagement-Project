import { Component } from '@angular/core';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { TaskModel } from 'src/app/core/model/task-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  tasklist : TaskModel[] = [];

  constructor(
    private apiUrl : ApiUrlHelper,
    private commonService : CommonService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getTaskList()
  }
  
  getTaskList(){
    const apiUrl   = this.apiUrl.apiUrl.teacher.getTaskList

    this.commonService
     .doGet(apiUrl)
     .pipe()
     .subscribe({
      next : (data) => {
        if(data && data.Success){
          this.tasklist = data.Data
        } 
      }
     })
  }
}
