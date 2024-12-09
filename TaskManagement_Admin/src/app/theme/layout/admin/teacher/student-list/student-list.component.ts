import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { UserModel } from 'src/app/core/model/user-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserMasterComponent } from '../user-master/user-master.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {

  public users : UserModel[] = []; 

  constructor( 
    private storageService: StorageService,
    private commonService: CommonService,
    private apiUrl: ApiUrlHelper,
    private router: Router,
    private modalService: NgbModal 
  ){}
  ngOnInit(): void {
    this.getStudentList()
  }

  getStudentList(){
    const apiUrl = this.apiUrl.apiUrl.user.getUserList

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next : (data) => {
          if(data && data.Success && data.Data){
            this.users = data.Data;
          }
        }
      })
  }

  openModal(){
    const modalRef = this.modalService.open(UserMasterComponent , {centered: true});
    modalRef.result.then((result) =>
      this.getStudentList()
    )
  }

  onEditModal(UserId : BigInt){
    
    const modalRef = this.modalService.open(UserMasterComponent , {
      centered: true
    })
    modalRef.componentInstance.data = UserId;
    modalRef.result.then((result) =>
      this.getStudentList()
    )
  }

  onDeleteUser(UserId : any){
    const apiUrl = this.apiUrl.apiUrl.user.deleteUser + '?UserId=' + UserId
    this.commonService
     .doGet(apiUrl)
     .pipe()
     .subscribe({
        next : (data) => {
          if(data && data.Success){
            this.getStudentList()
            console.log(data.Data)
          }
        }
      })
  }

}