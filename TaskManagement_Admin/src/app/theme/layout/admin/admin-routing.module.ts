import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/demo/default/default.component';
import { OcrImageComponent } from './ocr-image/ocr-image.component';
import { ChatComponent } from './chat/chat.component';

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
  },
  {
    path : "Chat",
    component : ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
