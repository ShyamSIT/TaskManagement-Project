import { Component, OnInit } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ocr-image',
  templateUrl: './ocr-image.component.html',
  styleUrl: './ocr-image.component.scss'
})
export class OcrImageComponent implements OnInit {
  imageFile!: File | null;
  extractedText: string = '';
  progress: number = 0;
  isProcessing: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  sanitizeHTML(text: string): SafeHtml {
    // const transformedText = this.formatResponseToHtml(text);
    return this.sanitizer.bypassSecurityTrustHtml(text);
    // return text;
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }
  processImage() {
    if (!this.imageFile) return;

    this.isProcessing = true;
    const reader = new FileReader();

    reader.onload = async () => {
      Tesseract.recognize(reader.result as string, 'eng', {
        logger: (info) => {
          if (info.status === 'recognizing text') {
            this.progress = Math.round(info.progress * 100);
          }
        }
      })
        .then(({ data: { text } }) => {
          this.extractedText = text;
          this.isProcessing = false;
        })
        .catch((error) => {
          console.error('OCR Error:', error);
          this.isProcessing = false;
        });
    };

    reader.readAsDataURL(this.imageFile);
  }
}
