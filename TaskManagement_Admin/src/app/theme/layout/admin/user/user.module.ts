import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';


@NgModule({
  declarations: [
    UserListComponent,
    TaskListComponent,
    AssignmentListComponent
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
