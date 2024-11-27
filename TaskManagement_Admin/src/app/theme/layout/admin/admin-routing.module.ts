import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/demo/default/default.component';

const routes: Routes = [
  {
    path : "",
    component : DefaultComponent,
  },
  {
    path : "user",
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path : "teacher",
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
