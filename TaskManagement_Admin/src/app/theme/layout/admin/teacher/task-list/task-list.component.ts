import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { TaskModel } from 'src/app/core/model/task-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { TaskMasterComponent } from '../task-master/task-master.component';
import { AssignMasterComponent } from '../assign-master/assign-master.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  tasklist : TaskModel[] = [];
  priorities = [
    {id: 1, name: 'High'},
    {id: 2, name: 'Medium'},
    {id: 3, name: 'Low'},
  ];

  OnChangeSelectPriority(event : any){
    if(event !== undefined){
      const priority = event.name
      this.tasklist = this.tasklist.filter(task => task.Priority === priority)
    }else{
      this.getTaskList()
    }
  }

  
  constructor(
    private apiUrl : ApiUrlHelper,
    private commonService : CommonService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastr : ToastrService,
    private route : Router 
  ) {  }

  ngOnInit(): void {
    this.getTaskList()
    
  }
  
  getTaskList(){
    const UserId = this.storageService.getValue('UserId');
    const apiUrl   = this.apiUrl.apiUrl.teacher.getTaskList+ '?UserId=' + UserId
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


  openModal(){
    const modalRef = this.modalService.open(TaskMasterComponent,{centered:true})
    modalRef.result.then((result) => {
      this.toastr.success("Added task Successfully")
      this.getTaskList()
    })
  }

  onTaskEdit(TaskId : number){
    const modalRef = this.modalService.open(TaskMasterComponent,{
      centered:true
    })
    modalRef.componentInstance.data = TaskId
    modalRef.result.then((result) => {
      this.toastr.success("Added task Successfully")
      this.getTaskList()
    })
  }

  onAssignTask(TaskId : number){
    const modalRef = this.modalService.open(AssignMasterComponent,{
      centered:true
    })
    modalRef.componentInstance.data = TaskId 
  }
  
  onDeleteTask(TaskId : number){
    const apiUrl = this.apiUrl.apiUrl.teacher.deleteTask + "?TaskId=" + TaskId
    this.commonService
     .doGet(apiUrl)
     .pipe()
     .subscribe({
        next : (data) => {
          if(data && data.Success){
            this.getTaskList()
          }
        }
     })
  }

  OnUpload(TaskId: any){
    this.route.navigate(['/teacher/upload-file',TaskId])
  }
}
