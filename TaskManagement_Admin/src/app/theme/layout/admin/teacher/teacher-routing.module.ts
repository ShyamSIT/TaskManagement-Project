import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { StudentListComponent } from './student-list/student-list.component';
import { canActivate } from 'src/app/guard/auth.guard';
import { TaskListComponent } from './task-list/task-list.component';
import { SubmitAssignmentListComponent } from './submit-assignment-list/submit-assignment-list.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FileListComponent } from './file-list/file-list.component';

const routes: Routes = [
  {
    path : 'demo',
    component : DemoComponent,
    canActivate : [canActivate]
  },
  {
    path : 'student-list',
    component : StudentListComponent,
    canActivate : [canActivate]
  },
  {
    path : 'task-list',
    component : TaskListComponent,
    canActivate : [canActivate]
  },
  {
    path : 'assignment-list',
    component : SubmitAssignmentListComponent,
    canActivate : [canActivate]   
  },
  {
    path: 'upload-file/:TaskId',
    component: UploadFileComponent,
    canActivate: [canActivate]  
  },
  {
    path : 'file-list',
    component : FileListComponent,
    canActivate : [canActivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
