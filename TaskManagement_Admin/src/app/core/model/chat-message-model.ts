export interface ChatMessageModel {
    MessageId: BigInt;
    SenderId: BigInt;
    ReceiverId: BigInt;
    MessageText?: string;
    IsRead: boolean;
    SentAt : string
}

