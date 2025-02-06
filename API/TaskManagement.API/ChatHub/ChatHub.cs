using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Security.Claims;
using TaskManagement.Data.DBRepository.Chat;
using TaskManagement.Model.Model;

namespace TaskManagement.API.ChatHub
{
    public class ChatHub : Hub
    {
        private readonly IChatRepository _chatRepository;

        public ChatHub(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.GetHttpContext()?.Request.Query["userId"];
            if (!string.IsNullOrEmpty(userId))
            {
                UserConnectionModel model = new UserConnectionModel
                {
                    UserId = Convert.ToInt64(userId),
                    ConnectionId = Context.ConnectionId
                };

                await _chatRepository.ChatAddUpdateConnection(model);
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.GetHttpContext()?.Request.Query["userId"];
            if (!string.IsNullOrEmpty(userId))
            {
                UserConnectionModel model = new UserConnectionModel
                {
                    UserId = Convert.ToInt64(userId),
                    ConnectionId = null
                };

                await _chatRepository.ChatAddUpdateConnection(model);
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(long SenderId, long ReceiverId, string message)
        {
            ChatMessageModel model = new ChatMessageModel()
            {
                SenderId = SenderId,
                ReceiverId = ReceiverId,
                MessageText = message
            };

            ChatMessageModel model1 = new ChatMessageModel();
            model1 = await _chatRepository.ChatSaveMessage(model);

            UserConnectionModel receiverConnection = await _chatRepository.GetConnectionId(ReceiverId);
            if (receiverConnection != null && receiverConnection.ConnectionId != null)
            {
                ChatMessageModel chatModel = new ChatMessageModel()
                {
                    SenderId = SenderId,
                    ReceiverId = ReceiverId,
                };
                //List<ChatMessageModel> messages = await _chatRepository.GetAllChatMessages(chatModel);
                await Clients.Client(receiverConnection.ConnectionId)
                    .SendAsync("ReceiveMessage", model1);
            }
            await Clients.Caller.SendAsync("ReceiveMessage", model1);
        }

        public async Task TypingIndicator(long? SenderId, long ReceiverId)
        {
            UserConnectionModel receiverConnection = await _chatRepository.GetConnectionId(ReceiverId);
            {
                await Clients.Client(receiverConnection.ConnectionId).SendAsync("TypingIndicator", SenderId,ReceiverId);
            }
        }
    }
}
