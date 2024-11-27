// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  registerForm : FormGroup = this.fb.group({})

  constructor(
    private fb : FormBuilder,
    private apiUrl : ApiUrlHelper,
    private commonService : CommonService,
    private route : Router  // injecting router to navigate to login page  // import { Router } from '@angular/router';
  ) { }

  ngOnInit(): void {
    this.initRegisterForm()
  }

  initRegisterForm(){
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(250)]],
      lastName: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  doRegister(){
    const apiUrl = this.apiUrl.apiUrl.user.saveUser

    const objData = {
      FirstName : this.registerForm.value.firstName,
      LastName : this.registerForm.value.lastName,
      Email : this.registerForm.value.email,
      Password : this.registerForm.value.password,
    }

    
    console.log(objData)

    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe({
        next : (data) => {
          if(data && data.Success){
            console.log(data);
            // navigate to login page
            this.route.navigate(['/auth/login'])
          }
        }
      })
  }
}
