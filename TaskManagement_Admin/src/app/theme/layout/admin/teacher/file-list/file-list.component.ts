import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent implements OnInit {
  constructor(
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private route: Router,
    private sanitizer : DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getFileList();
  }

  FileList = []
  filePath : any = null
  
  getFileList() {
    const UserId = this.storageService.getValue('UserId');
    const apiUrl = this.apiUrl.apiUrl.teacher.getFileListByTeacherId + '?UserId=' + UserId;

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success) {
            this.FileList = data.Data;
          }
        }
      })
  }

  onDownload(FileId : any){
    
  }

  OnViewPdf(FileName : any){
    const apiUrl = this.apiUrl.apiUrl.teacher.viewPdf + '?FileName=' + FileName;

    this.commonService
     .doGet(apiUrl)
     .pipe()
     .subscribe((result) => {
      this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(environment.baseUrl + '/' + result.Data)
      window.open(environment.baseUrl + '/' + result.Data)
     })

  }

}
