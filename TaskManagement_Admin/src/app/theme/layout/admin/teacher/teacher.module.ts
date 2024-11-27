import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskMasterComponent } from './task-master/task-master.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [
    StudentListComponent,
    TaskMasterComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
