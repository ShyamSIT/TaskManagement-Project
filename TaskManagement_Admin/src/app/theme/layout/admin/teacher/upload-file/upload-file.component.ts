import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent implements OnInit {

  TaskId : any = 0;
  selectedFile : File
  uploadForm : FormGroup = this.fb.group({})

  constructor(
    private fb : FormBuilder,
    private route : Router,
    private router : ActivatedRoute,
    private apiUrl : ApiUrlHelper,
    private commonService : CommonService,
    private storageService: StorageService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.TaskId = params['TaskId'];
    })

    this.uploadForm = this.fb.group({ 
      file : ['',Validators.required]
    })
  }



  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
  }

  onSubmit(){

    if(this.selectedFile == null){
      this.toastr.warning("Please select a file")
      return 
    }
    const apiUrl = this.apiUrl.apiUrl.teacher.uploadFile
    const objData = {
      TaskId : this.TaskId,
      UserId : this.storageService.getValue('UserId')
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('fileModel.TaskId', objData.TaskId);
    formData.append('fileModel.UserId', objData.UserId);
    
    this.commonService
     .doPost(apiUrl, formData)
     .pipe()
     .subscribe({
      next : (data) => {
        if(data && data.Success) {
          this.toastr.success(data.Message);
          this.route.navigate(['/teacher/task-list'])
        }else{
          this.toastr.error(data.Message);
        }
      },
      error : (err) => {
        console.error(err);
      }
     });

  }
}
