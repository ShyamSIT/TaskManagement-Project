using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.Chat
{
    public interface IChatService
    {
        public Task ChatAddUpdateConnection(UserConnectionModel model);
        public Task<ChatMessageModel> ChatSaveMessage(ChatMessageModel ChatModel);
        public Task<UserConnectionModel> GetConnectionId(long UserId);
        public Task<List<ChatMessageModel>> GetAllChatMessages(ChatMessageModel model);
    }
}
