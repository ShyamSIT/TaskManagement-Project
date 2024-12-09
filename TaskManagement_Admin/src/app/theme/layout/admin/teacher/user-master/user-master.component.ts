import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { UserModel } from 'src/app/core/model/user-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrl: './user-master.component.scss'
})
export class UserMasterComponent implements OnInit {
  
  userForm : FormGroup = this.fb.group({})
  public UserId  = 0
  @Input() data: any;

  user : UserModel = {
    UserId : BigInt(0),
    FirstName : '',
    LastName : "",
    Email : "",
    Password : "",
    RoleId : BigInt(0),
    FullName : ""
  }

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService,
    private storageService: StorageService
  ) { }

  
  ngOnInit(): void {
    
    this.UserId = this.data || 0;
    this.initRegisterForm()
    if(this.UserId > 0){
      this.getUserByUserId(this.UserId)
    }else{
      console.log("new user")
    }
  }

  initRegisterForm(){
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(250)]],
      lastName: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  adduser(){
    if(!this.userForm.valid) {
      return
    }
    const apiUrl = this.apiUrl.apiUrl.user.saveUser

    const objData = {
      UserId  : this.UserId || 0,
      FirstName : this.userForm.value.firstName,
      LastName : this.userForm.value.lastName,
      Email : this.userForm.value.email,
      Password : this.userForm.value.password,
    }

    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe({
        next : (data) => {
          if(data && data.Success){
          }
        }
      })

    this.modalRef.close();
  }

  getUserByUserId(UserId : any){
    
    const apiUrl = this.apiUrl.apiUrl.user.getUserByUserId + '?UserId=' + UserId
    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next : (data) => {
          if(data && data.Data){
            this.user = data.Data
          }
        }
      })
  }

}
