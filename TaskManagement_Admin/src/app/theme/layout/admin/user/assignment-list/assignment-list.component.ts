import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { debug } from 'console';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { AssignmentModel } from 'src/app/core/model/assignment-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.scss',
  providers: [DatePipe]
})
export class AssignmentListComponent {
  assignments: AssignmentModel[] = [];
  todayDate: any;
  constructor(
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService,
    private storageService: StorageService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    debugger;
    this.getAssignments();
    this.todayDate = new Date();
  }

  getAssignments() {
    const UserId = this.storageService.getValue('UserId');
    const apiUrl = this.apiUrl.apiUrl.user.getAssignmentList + '?UserId=' + UserId;

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data?.Data) {
            // Parse Deadline as Date object for accurate comparison
            this.assignments = data.Data.map((assignment: any) => ({
              ...assignment,
              Deadline: new Date(assignment.Deadline) // Ensure Deadline is a Date object
            }));
          }
        }
      });
  }

  submitAssignment(assignment: AssignmentModel): void {
    const apiUrl = this.apiUrl.apiUrl.user.submitAssignment;
    const objData = {
      AssignmentId: assignment.AssignmentId,
      TaskId: assignment.TaskId,
      TaskName: assignment.TaskName,
      UserId: assignment.UserId,
      UserName: null,
      IsCompleted: true,
      AssignDate: null,
      Deadline: null
    };

    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success) this.getAssignments();
        }
      });
  }
}
