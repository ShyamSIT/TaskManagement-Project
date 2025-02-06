import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ApiUrlHelper } from 'src/app/config/apiUrlHelper'
import { ChatMessageModel } from 'src/app/core/model/chat-message-model'
import { UserModel } from 'src/app/core/model/user-model'
import { CommonService } from 'src/app/core/services/common.service'
import { SignalRService } from 'src/app/core/services/signalR.service'
import { StorageService } from 'src/app/core/services/storage.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer: any
  loggedUserId = this.storageService.getValue('UserId')
  users: UserModel[] = []
  selectedUser: UserModel | null = null
  messages: ChatMessageModel[] = []
  groupedMessages: Map<string, ChatMessageModel[]> = new Map()
  messageText: string = ''
  isTyping: boolean = false

  constructor(
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService,
    private storageService: StorageService,
    private signalService: SignalRService
  ) {}
  ngOnInit(): void {
    this.getAllUsers()
    this.signalService.startConnection()
    this.signalService.onReceiveMessage((model) => {
      const chatMessage: ChatMessageModel = {
        MessageId: model.messageId, // Match the casing from the response
        SenderId: model.senderId,
        ReceiverId: model.receiverId,
        MessageText: model.messageText,
        IsRead: model.isRead,
        SentAt: model.sentAt // Match the casing from the response
      }
      // Now you can use chatMessage in your component
      this.messages.push(chatMessage)
      this.groupedMessages = this.commonService.groupMessages(this.messages)
    })
    this.signalService.receivedTypingIndicator((SenderId,receiverId) => {
      if (SenderId && SenderId === this.selectedUser?.UserId  && receiverId === this.loggedUserId ) {
        this.isTyping = true
      } else {
        this.isTyping = false
      }
    })
    this.scrollToBottom()
  }
  ngOnDestroy(): void {
    this.signalService.stopConnection()
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  getAllUsers() {
    const apiUrl = this.apiUrl.apiUrl.user.getAllUsers
    this.commonService
      .doGet(apiUrl)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Data) {
            this.users = data.Data
          }
        }
      })
  }
  selectUser(user: UserModel): void {
    this.scrollToBottom()
    this.selectedUser = user
    this.signalService.getAllChatMessges(this.selectedUser)
    this.signalService.chatMessages$.subscribe((data) => {
      this.messages = data
      this.groupedMessages = this.commonService.groupMessages(this.messages)
    })
  }

  sendMessage() {
    const SenderId = this.storageService.getValue('UserId')
    const ReceiverId = this.selectedUser.UserId
    this.signalService.sendMessage(SenderId, ReceiverId, this.messageText)
    this.messageText = ''
    this.scrollToBottom()
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
    }
  }

  onTyping() {
    if (!this.isTyping && this.messageText != '') {
      this.signalService.sendTypinIndicator(this.storageService.getValue('UserId'), this.selectedUser.UserId)
    }
    if (this.messageText == '') {
      this.signalService.sendTypinIndicator(null, this.selectedUser.UserId)
    }
  }

  asIsOrder(a, b) {
    return 1
  }
}
