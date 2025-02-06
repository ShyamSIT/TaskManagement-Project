using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Common.Helper;
using TaskManagement.Model;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Chat
{
    public class ChatRepository(IConfiguration config, IOptions<ConnectionStrings> connectionStrings) : BaseRepository(connectionStrings), IChatRepository
    {
        public async Task ChatAddUpdateConnection(UserConnectionModel model)
        {
            var param = new DynamicParameters();
            param.Add("@UserId", model.UserId);
            param.Add("@ConnectionId", model.ConnectionId);

            await QueryFirstOrDefaultAsync<UserConnectionModel>(StoreProcedure.ChatAddUpdateConnection, param);
        }

        public async Task<ChatMessageModel> ChatSaveMessage(ChatMessageModel ChatModel)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@SenderId", ChatModel.SenderId);
                param.Add("@ReceiverId", ChatModel.ReceiverId);
                param.Add("@MessageText", ChatModel.MessageText);

                return await QueryFirstOrDefaultAsync<ChatMessageModel>(StoreProcedure.ChatSaveMessage, param);
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

        public async Task<List<ChatMessageModel>> GetAllChatMessages(ChatMessageModel model)
        {
            var param = new DynamicParameters();
            param.Add("@SenderId", model.SenderId);
            param.Add("@ReceiverId", model.ReceiverId);

            var list = await QueryAsync<ChatMessageModel>(StoreProcedure.GetAllChatMessages, param);
            return list.ToList();
        }

        public async Task<UserConnectionModel> GetConnectionId(long UserId)
        {
            var param = new DynamicParameters();
            param.Add("@UserId",UserId);

            return await QueryFirstOrDefaultAsync<UserConnectionModel>(StoreProcedure.GetConnectionId,param);
        }
    }
}
