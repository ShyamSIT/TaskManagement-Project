import { Component } from '@angular/core';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-submit-assignment-list',
  templateUrl: './submit-assignment-list.component.html',
  styleUrl: './submit-assignment-list.component.scss'
})
export class SubmitAssignmentListComponent {
  assignments : any[] = [];

  constructor(
    private apiUrl : ApiUrlHelper,
    private commonService : CommonService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.getAssignments()
  }
  

  getAssignments(){
    const UserId = this.storageService.getValue('UserId');
    const apiUrl = this.apiUrl.apiUrl.teacher.getAssignmentListByTeacherId + '?UserId=' + UserId

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next : (data) => {
          if(data && data.Data)
            this.assignments = data.Data
        }
      })
  }
}
