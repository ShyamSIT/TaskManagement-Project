import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskMasterComponent } from './task-master/task-master.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AssignMasterComponent } from './assign-master/assign-master.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DemoComponent } from './demo/demo.component';
import { SubmitAssignmentListComponent } from './submit-assignment-list/submit-assignment-list.component';


@NgModule({
  declarations: [
    DemoComponent,
    StudentListComponent,
    TaskMasterComponent,
    TaskListComponent,
    AssignMasterComponent,
    SubmitAssignmentListComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class TeacherModule { }
