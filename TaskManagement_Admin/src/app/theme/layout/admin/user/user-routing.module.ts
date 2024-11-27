import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { canActivate } from 'src/app/guard/auth.guard';
import { TaskListComponent } from './task-list/task-list.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
