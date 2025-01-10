import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/demo/default/default.component';
import { OcrImageComponent } from './ocr-image/ocr-image.component';

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
  },
  {
    path : 'ocr-image',
    component : OcrImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
