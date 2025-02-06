using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Chat
{
    public  interface IChatRepository
    {
        public Task ChatAddUpdateConnection(UserConnectionModel model);
        public Task<ChatMessageModel> ChatSaveMessage(ChatMessageModel ChatModel);
        public Task<UserConnectionModel> GetConnectionId(long UserId);
        public Task<List<ChatMessageModel>> GetAllChatMessages(ChatMessageModel model);
    }
}
