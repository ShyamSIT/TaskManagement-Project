import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper';
import { CommonService } from './common.service';
import { ChatMessageModel } from '../model/chat-message-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private chatMessages = new BehaviorSubject<ChatMessageModel[]>([]);
  chatMessages$ = this.chatMessages.asObservable();

  constructor(
    private storageService: StorageService,
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService
  ) {}

  private userId = this.storageService.getValue('UserId');

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5077/chat-hub?userId=${this.userId}`, { withCredentials: false })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
      })
      .catch((err) => console.error('SignalR Error:', err));

    
  }
  receivedTypingIndicator(callback : (senderId,receiverId) => any){
    this.hubConnection.on('TypingIndicator', (senderId : any,receiverId : any) => {
      callback(senderId,receiverId);
    });
  }
  
  onReceiveMessage(callback: (chatMessageModel) => void): void {
    this.hubConnection.on('ReceiveMessage', (chatMessageModel) => {
      callback(chatMessageModel);
    });
  }

  sendMessage(SenderId: BigInt, ReceiverId: BigInt, message: string) {
    this.hubConnection
      .invoke('SendMessage', SenderId, ReceiverId, message)
      .then(() => {
        console.log('Sent message Successfully');
      })
      .catch((err) => console.error(err));
  }

  stopConnection() {
    this.hubConnection.stop().then(() => {
      console.log("SignalR DisConnected")
    }).catch((err) => console.error('Error stopping SignalR:', err));
  }

  getAllChatMessges(selectedUser: any) {
    const apiUrl = this.apiUrl.apiUrl.chat.getAllChatMessages;
    const objData = {
      SenderId: this.storageService.getValue('UserId'),
      ReceiverId: selectedUser.UserId
    };

    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Data) {
            this.chatMessages.next(data.Data);
          }
        }
      });
  }

  sendTypinIndicator(SenderId: BigInt, ReceiverId: BigInt) {
    this.hubConnection
      .invoke('TypingIndicator', SenderId, ReceiverId)
      .then(() => {
        console.log('Sent Typing Indicator Successfully');
      })
      .catch((err) => console.error(err));
  }
}
