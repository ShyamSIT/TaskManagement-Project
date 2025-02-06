using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.Chat;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.Chat
{
    public class ChatService(IChatRepository chatRepository) : IChatService
    {
        private readonly IChatRepository _chatRepository = chatRepository;

        public async Task ChatAddUpdateConnection(UserConnectionModel model)
        {
            await _chatRepository.ChatAddUpdateConnection(model);
        }

        public async Task<ChatMessageModel> ChatSaveMessage(ChatMessageModel ChatModel)
        {
            return await _chatRepository.ChatSaveMessage(ChatModel);
        }

        public async Task<List<ChatMessageModel>> GetAllChatMessages(ChatMessageModel model)
        {
            return await _chatRepository.GetAllChatMessages(model);
        }

        public async Task<UserConnectionModel> GetConnectionId(long UserId)
        {
            return await _chatRepository.GetConnectionId(UserId);
        }
    }
}
