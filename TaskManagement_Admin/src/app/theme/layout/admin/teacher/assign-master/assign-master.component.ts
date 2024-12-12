import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { AssignmentModel } from 'src/app/core/model/assignment-model';
import { TaskModel } from 'src/app/core/model/task-model';
import { UserModel } from 'src/app/core/model/user-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { DemoComponent } from '../demo/demo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-master',
  templateUrl: './assign-master.component.html',
  styleUrl: './assign-master.component.scss'
})
export class AssignMasterComponent implements OnInit {
  users : UserModel[] = [];
  form : FormGroup = this.fb.group({})
  TaskId = 0
  @Input() data : any
  task : TaskModel

  constructor(
    public dialog : NgbModal,
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService,
    private storageService: StorageService,
    private route : Router
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.TaskId = this.data || 0
    this.initialForm()
    this.getUsers()
  }

  initialForm(){
    this.form = this.fb.group({
      TaskId : [this.TaskId],
      StudentId : [[]]
    })  
  }

  onSubmit(){

    const jwttoken = this.storageService.getValue('JwtToken')
    if(!jwttoken){
      this.route.navigate['/auth/login']
      return
    }

    const apiUrl = this.apiUrl.apiUrl.teacher.assignTask
    const objData = {
      TaskId : this.form.value.TaskId,
      StudentIds : this.form.value.StudentId
    }


    this.commonService
      .doPost(apiUrl,objData)
      .pipe()
      .subscribe({
        next :(data) => {
          console.log(data.Data)
        }
      })
    this.modalRef.close();
  }

  getUsers() {
    const apiUrl = this.apiUrl.apiUrl.teacher.getAllUsersByNotAssignTask + '?TaskId=' + this.TaskId

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next : (data) => {
          if(data && data.Data)
            this.users = data.Data
            this.users.forEach(user => 
              user.FullName = user.FirstName + ' ' + user.LastName
            )
        }
      })
  }

  // openModal(){
  //   const dialog = this.dialog.open(DemoComponent,{
  //     centered : true
  //   });
  // }
}
