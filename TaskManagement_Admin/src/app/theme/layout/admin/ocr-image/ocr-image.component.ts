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
  isProcessing: boolean = false;
  progress: number = 0;
  userInput: string = ''; // Holds the user's input
  chatMessages: { sender: string; text: string; expanded: boolean }[] = [];
  count = 0;
  intervalId: any;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
  }

  transformMessage(text: string): string {
    let transformedText = text.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    transformedText = transformedText.replace(/`([^`]+)`/g, '<code>$1</code>');
    transformedText = transformedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    transformedText = transformedText.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return transformedText;
  }

  sanitizeHTML(text: string): SafeHtml {
    const transformedText = this.transformMessage(text);
    return this.sanitizer.bypassSecurityTrustHtml(transformedText);
  }

  getBotResponse(userMessage: string): string {
    // Here, you can integrate your chatbot API instead of this mock response
    if (userMessage.toLowerCase().includes('hello')) {
      return 'Hi there! How can I assist you today?';
    } else if (userMessage.toLowerCase().includes('help')) {
      return 'Sure! What do you need help with?';
    }
    return 'I am not sure about that. Could you rephrase?';
  }

  toggleMessage(message) {
    if (message.sender === 'Bot') {
      message.expanded = !message.expanded;
    }
  }

  async sendMessage() {
    if (this.userInput.trim() === '') {
      return; // Ignore empty input
    }

    // Add user's message to the chat
    this.chatMessages.push({ sender: 'User', text: this.userInput, expanded: false });

    // Simulate bot's response
    const botResponse = await this.translateText(this.userInput);

    // Add bot's response to the chat
    this.chatMessages.push({ sender: 'Bot', text: botResponse, expanded: true });

    // Clear the input field
    this.userInput = '';
  }
  async translateText(userInput: string) {
    const genAI = new GoogleGenerativeAI('AIzaSyAy-Lk7dlNjCpIa-DguF1y0AzcwejRgRDk');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: this.userInput
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1
      }
    });
    return result.response.text();
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
