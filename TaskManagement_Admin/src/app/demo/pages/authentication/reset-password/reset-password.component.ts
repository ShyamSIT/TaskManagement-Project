import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  formSubmitted = false;
  token: string;
  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private commonService: CommonService,
    private apiUrl: ApiUrlHelper,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    var queryParams = this.route.snapshot.queryParams;
    this.token = queryParams['token'] ? queryParams['token'] : '';
    this.initialResetPasswordForm();
  }

  initialResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (!this.resetPasswordForm.valid) {
      return;
    }
    const apiUrl = this.apiUrl.apiUrl.login.resetPassword;
    const objData = {
      Token: this.token,
      NewPassword: this.resetPasswordForm.value.newPassword
    };

    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe({
        next: (data) => {
          this.formSubmitted = false;
          if (data && data.Success) {
            alert(data.Message);
          } else {
            alert(data.Message);
          }
        },
        error: (error) => {
          this.formSubmitted = false;
          alert('Error occurred. Please try again later.');
        }
      });
  }
}
