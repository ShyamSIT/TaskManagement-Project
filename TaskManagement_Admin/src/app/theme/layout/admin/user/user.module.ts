import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { FileListComponent } from './file-list/file-list.component';



@NgModule({
  declarations: [
    UserListComponent,
    TaskListComponent,
    AssignmentListComponent,
    FileListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe
  ]
})
export class UserModule { }
