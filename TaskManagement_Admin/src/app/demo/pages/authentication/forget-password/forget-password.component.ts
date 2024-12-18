import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit { 

  forgetPasswordForm : FormGroup = this.fb.group({}) 
  formSubmitted : boolean = false

  constructor(
    private fb : FormBuilder,
    private storageService: StorageService,
    private commonService: CommonService,
    private apiUrl: ApiUrlHelper,
    private router: Router,
    private toastr: ToastrService  
  ){}

  ngOnInit(): void {
    this.initForgetPasswordForm()
  }

  initForgetPasswordForm(){
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onsubmit(){
    this.formSubmitted = true;
    if(!this.forgetPasswordForm.valid){
      return
    }

    const apiUrl = this.apiUrl.apiUrl.login.forgetPassword 
    const objData = { 
      Email : this.forgetPasswordForm.value.email
    }

    this.commonService
     .doPost(apiUrl, objData)
     .pipe()
     .subscribe({
        next: (data) => {
          this.formSubmitted = false;
          if(data && data.Success){
            this.toastr.success(data.Message);
          }else{
            this.toastr.error(data.Message);
          }
        },
        error: (error) => {
          console.error(error)
        }
      })
  }
}
