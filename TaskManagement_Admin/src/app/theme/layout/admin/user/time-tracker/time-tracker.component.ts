import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { AssignmentModel } from 'src/app/core/model/assignment-model';
import { TimeLogModel } from 'src/app/core/model/task-model';
import { CommonService } from 'src/app/core/services/common.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrl: './time-tracker.component.scss'
})
export class TimeTrackerComponent implements OnInit {
  assignments: AssignmentModel[] = [];
  timeLogs: TimeLogModel[] = [];
  timeLogByParentId: TimeLogModel[] = [];
  expandedRowId: number | null = null;
  timeTrackerId: any;
  timeTrackerForm: FormGroup = this.fb.group({});
  elapsedTime: Date;
  intervalId: any;
  TaskId: number;
  currentTask: TimeLogModel = {
    TimeLogId: 0,
    TimeLogText: '',
    TaskId: 0,
    UserId: 0,
    StartTime: null,
    EndTime: null,
    TaskName: '',
    ParentId: 0
  };

  isStartedBtn: boolean = false;
  isStartedMap: { [key: number]: boolean } = {};
  currentStartedTimeLog: any = null;

  constructor(
    private fb: FormBuilder,
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.resetTime();
    this.getTimeLoglist();
    this.getAssignments();
    this.initialTimeForm();
  }

  initialTimeForm() {
    this.timeTrackerForm = this.fb.group({
      timeLogText: [''],
      TaskId: [null]
    });
  }

  calculateTotalTimeById = (timeLogId) => {
    const logs = this.timeLogs.filter((t) => t.ParentId === timeLogId || t.TimeLogId === timeLogId);

    let diffInMs = 0;
    logs.forEach((log) => {
      let start = new Date(log.StartTime); // Convert start time to milliseconds
      let end = new Date(log.EndTime);

      // Zero out milliseconds
      start.setMilliseconds(0);
      end.setMilliseconds(0);

      diffInMs += end.getTime() - start.getTime();

      //diffInMs += end - start
    });

    if (diffInMs < 0) {
      return '00:00:00'; // Invalid range, return default
    }
    const totalSeconds = Math.floor(diffInMs / 1000); // Convert to total seconds
    const hours = Math.floor(totalSeconds / 3600); // Get total hours
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60; // Get remaining seconds

    // Format time as HH:mm:ss
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  };

  calculateTotalTime(startTime: any, endTime: any): string {
    if (!startTime || !endTime) {
      return '00:00:00'; // Default value when times are missing
    }

    const start = new Date(startTime); // Convert start time to milliseconds
    const end = new Date(endTime); // Convert end time to milliseconds
    start.setMilliseconds(0);
    end.setMilliseconds(0);

    const diffInMs = end.getTime() - start.getTime(); // Difference in milliseconds

    if (diffInMs < 0) {
      return '00:00:00'; // Invalid range, return default
    }

    const totalSeconds = Math.floor(diffInMs / 1000); // Convert to total seconds
    const hours = Math.floor(totalSeconds / 3600); // Get total hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Get remaining minutes
    const seconds = totalSeconds % 60; // Get remaining seconds

    // Format time as HH:mm:ss
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  getEndTimeOfParent(timeLogId) {
    const logs = this.timeLogs.filter((t) => t.ParentId === timeLogId || t.TimeLogId === timeLogId);
    let endTime = logs[0].EndTime;
    return endTime;
  }
  padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  getAssignments() {
    const UserId = this.storageService.getValue('UserId');
    const apiUrl = this.apiUrl.apiUrl.user.getAssignmentList + '?UserId=' + UserId;

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Data) this.assignments = data.Data;
        }
      });
  }

  onChangeSelectTask(event: any) {
    this.TaskId = event.TaskId;
  }

  getTimeLoglist() {
    const UserId = this.storageService.getValue('UserId');
    const apiUrl = this.apiUrl.apiUrl.timeLog.getTimeLogListByUserId + '?UserId=' + UserId;

    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Data) this.timeLogs = data.Data;
        }
      });
  }
  onChildData(timeLogId) {
    if (this.expandedRowId === timeLogId) {
      this.expandedRowId = null; // Collapse the row if it's already expanded
    } else {
      this.expandedRowId = timeLogId;
      this.timeLogByParentId = this.timeLogs.filter((t) => t.ParentId === timeLogId || t.TimeLogId === timeLogId);
    }
  }

  isStarted(timelog: any): boolean {
    return this.isStartedMap[timelog.TimeLogId] || false; // Default to false if not set
  }

  onStart(timelog: any) {
    if (this.currentStartedTimeLog && this.currentStartedTimeLog.TimeLogId !== timelog.TimeLogId) {
      this.onStop(this.currentStartedTimeLog);
    }

    //set the which timelog is started
    this.isStartedBtn = true;

    this.resetTime();
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.currentTask.StartTime = new Date();
    if (timelog != null) {
      this.timeTrackerId = timelog.TimeLogId;
      // this.currentTask.TimeLogId = timelog.TimeLogId
      this.isStartedMap[timelog.TimeLogId] = true;
      this.currentStartedTimeLog = timelog;
      if (timelog != null) {
        this.timeTrackerForm.patchValue({
          timeLogText: timelog.TimeLogText
        });
      }
      this.timeTrackerForm.patchValue({
        TaskId: timelog.TaskId
      });
      if (timelog.ParentId == null) {
        timelog.ParentId = timelog.TimeLogId;
      }
      this.TaskId = timelog.TaskId;
    }
    //for the starting the elapsed time
    this.intervalId = setInterval(() => {
      const newTime = new Date(this.elapsedTime);
      newTime.setSeconds(newTime.getSeconds() + 1);
      this.elapsedTime = newTime;
    }, 1000);

    const apiurl = this.apiUrl.apiUrl.timeLog.addTimeLogTask;
    const objData = {
      TimeLogId: timelog != null ? timelog.ParentId : 0,
      TimeLogText: this.timeTrackerForm.value.timeLogText != null ? this.timeTrackerForm.value.timeLogText : '',
      TaskId: this.TaskId,
      UserId: this.storageService.getValue('UserId'),
      StartTime: this.currentTask.StartTime,
      EndTime: null
    };

    this.commonService
      .doPost(apiurl, objData)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success) {
            // this.getTimeLoglist();
            this.currentTask.TimeLogId = data.Data.TimeLogId;
            this.TaskId = null;
          } else {
            this.toastr.error('Failed to Log Time');
          }
        }
      });
  }

  onStop(timelog: any) {
    //set the which timelog is stopped

    this.isStartedBtn = false;

    if (timelog != null) {
      this.isStartedMap[timelog.TimeLogId] = false;
    } else {
      this.isStartedMap[this.currentTask.TimeLogId] = false;
      this.isStartedMap[this.timeTrackerId] = false;
    }
    this.currentStartedTimeLog = null;

    this.resetTime();
    clearInterval(this.intervalId);
    this.currentTask.EndTime = new Date();

    const apiurl = this.apiUrl.apiUrl.timeLog.addTimeLogTask;
    const objData = {
      TimeLogId: this.currentTask.TimeLogId,
      TaskId: this.TaskId,
      EndTime: this.currentTask.EndTime
    };
    this.commonService
      .doPost(apiurl, objData)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success) {
            this.getTimeLoglist();
            this.currentTask = {
              TimeLogId: 0,
              TimeLogText: '',
              TaskId: 0,
              UserId: 0,
              StartTime: null,
              EndTime: null,
              TaskName: null,
              ParentId: 0
            };
            this.timeTrackerId = 0;
            this.timeTrackerForm.reset();
          } else {
            this.toastr.error('Failed to Log Time');
          }
        }
      });
  }

  DeleteTimeLog(timeLogId: any): void {
    const apiUrl = this.apiUrl.apiUrl.timeLog.deleteTimeLogIdById;
    const objData = {
      TimeLogId: timeLogId
    };
    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data) {
            this.getTimeLoglist();
          } else {
            this.toastr.error('Failed to Delete Time Log');
          }
        }
      });
  }

  resetTime(): void {
    this.elapsedTime = new Date();
    this.elapsedTime.setHours(0, 0, 0, 0);
  }
}
