import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { UserModel } from 'src/app/core/model/user-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

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
}