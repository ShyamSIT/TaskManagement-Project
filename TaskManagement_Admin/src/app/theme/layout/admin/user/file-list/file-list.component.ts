import { Component, OnInit } from '@angular/core';
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
    private route: Router
  ) {}

  FileList = [];

  ngOnInit(): void {
    this.getFileList();
  }

  OnViewPdf(FileName: any) {
    window.open(environment.baseUrl + '/UploadFiles/' + FileName);
  }

  getFileList() {
    const UserId = this.storageService.getValue('UserId');
    const apiUrl = this.apiUrl.apiUrl.user.getFileListByUserId + '?UserId=' + UserId;

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success) {
            this.FileList = data.Data;
          }
        }
      });
  }

  OnDownload(FileName: any): void {
    debugger;
    // const apiUrl = this.apiUrl.apiUrl.user.downloadPdf + '?FileName=' + FileName;
    // this.commonService.
    //   downloadFile(apiUrl)
    //   .pipe()
    //   .subscribe((result) => {
    //     const blob = new Blob([result , { type: 'application/pdf'}])
    //     const url = window.URL.createObjectURL(blob);
    //     const anchor = document.createElement('a');
    //     anchor.href = url;
    //     anchor.download = FileName; // Specify the file name
    //     anchor.click()

    //     window.URL.revokeObjectURL(url);
    //     console.log(blob);
    //   })
    const url = environment.baseUrl + '/UploadFiles/' + FileName
    const anchor = document.createElement('a'); // Create an anchor element
    anchor.href = url // Set the file URL
    anchor.download = url; // Optional: Rename the file
    // anchor.target = '_self'; // Opens in the same tab
    
    anchor.click();
  }
}
