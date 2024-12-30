import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { canActivate } from 'src/app/guard/auth.guard';
import { TaskListComponent } from './task-list/task-list.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { FileListComponent } from './file-list/file-list.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';

const routes: Routes = [
  {
    path : 'user-list',
    component: UserListComponent,
    canActivate : [canActivate]
  },
  {
    path : 'task-list',
    component : TaskListComponent,
    canActivate : [canActivate]
  },
  {
    path :'assignment-list',
    component : AssignmentListComponent,
    canActivate : [canActivate]
  },
  {
    path : 'file-list',
    component : FileListComponent,
    canActivate : [canActivate]
  },
  {
    path : 'time-tracker',
    component : TimeTrackerComponent,
    canActivate : [canActivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
