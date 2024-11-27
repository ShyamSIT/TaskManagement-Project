import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [
    UserListComponent,
    TaskListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
