import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { OcrImageComponent } from './ocr-image/ocr-image.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    OcrImageComponent,ChatComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
