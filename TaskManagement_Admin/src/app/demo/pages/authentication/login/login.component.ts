// angular import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageKey, StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit { 
  loginForm : FormGroup = this.fb.group({});
  formSubmitted: boolean = false;

  constructor(
    private fb : FormBuilder,
    private storageService: StorageService,
    private commonService: CommonService,
    private apiUrl: ApiUrlHelper,
    private router: Router,
  ){}
  ngOnInit(): void {
    this.storageService.clearStorage();
    this.initLoginForm()
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  doLogin() {
    this.formSubmitted = true;
    if (!this.loginForm.valid) {
      // this.loginForm.markAllAsTouched();
      return;
    }
    const apiUrl = this.apiUrl.apiUrl.login.loginUser;
    const objData = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };

    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe({
        next: (data) => {
        
          if (data.Success && data.Data) {
            this.formSubmitted = false;
            const LoginDetail = data.Data;
            // if (LoginDetail.Is2FARequired) {
            //   this.commonService.showNotification(
            //     'Login',
            //     data.Message,
            //     NotificationType.SUCCESS,
            //   );
            //   const encryptedUserId = this.commonService.Encrypt(
            //     LoginDetail.EncryptedUserId,
            //   );
            //   const verifyUser = this.commonService.Encrypt(
            //     LoginDetail.VerifyUser,
            //   );
            //   this.router.navigate(['/auth/two-factor-auth'], {
            //     queryParams: { userId: encryptedUserId, auth: verifyUser },
            //   });
            // } else {
            if(LoginDetail.UserId > 0){
              const loginData = {
                JwtToken: LoginDetail.JwtToken,
                UserId : LoginDetail.UserId,
                FirstName: LoginDetail.FirstName,
                LastName: LoginDetail.LastName,
                Email: LoginDetail.Email,
                RoleId: LoginDetail.RoleId,
              }
              this.storageService.setValue(StorageKey.loginData, loginData);
            }
             
            // navigate to teacher module or user module
            if(LoginDetail.RoleId === 1){
              this.router.navigate(['/teacher/task-list']) 
            }else{  
              this.router.navigate(['/user/assignment-list'])
            }
          } else {
            // this.commonService.showNotification(
            //   'Login',
            //   data.Message,
            //   NotificationType.ERROR,
            // );

            console.log(data)
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.info('complete');
        },
      });
    // return true;
  }
}
