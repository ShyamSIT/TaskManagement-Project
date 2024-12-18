import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ToastrService } from 'ngx-toastr';
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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    var queryParams = this.route.snapshot.queryParams;
    this.token = queryParams['token'] ? queryParams['token'] : '';
    this.initialResetPasswordForm();
  }

  initialResetPasswordForm() {
    this.resetPasswordForm = this.fb.group(
      {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
      },
      { validator: this.passwordsMatchValidator }
  );
  }

  passwordsMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
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
            this.toastr.success(data.Message)
          } else {
            this.toastr.error(data.Message)
            this.router.navigate(['/auth/login']);
          }
        },
        error: (error) => {
          this.formSubmitted = false;
          alert('Error occurred. Please try again later.');
        }
      });
  }
}
