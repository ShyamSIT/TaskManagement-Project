import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

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

  ngOnInit(): void {
    this.getFileList();
  }

  FileList = []

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
}
