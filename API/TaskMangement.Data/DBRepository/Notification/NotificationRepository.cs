using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Common.Helper;
using TaskManagement.Model;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Notification
{
    public class NotificationRepository(IOptions<ConnectionStrings> connectionString) : BaseRepository(connectionString), INotificationRepository
    {
        public async Task<List<NotificationModel>> GetAllNotificationByUserId(long UserId)
        {
            var param = new DynamicParameters();
            param.Add("@UserId", UserId);

            var data =  await QueryAsync<NotificationModel>(StoreProcedure.GetAllNotificationByUserId,param);
            return data.ToList();
        }

        public async Task NotifyNewTask(NotificationModel task)
        {
            var param = new DynamicParameters();
            param.Add("@NotificationId", task.NotificationId);
            param.Add("@UserId", task.UserId);
            param.Add("@TaskId", task.TaskId);
            param.Add("@Message", task.Message);

            await QueryAsync<NotificationModel>(StoreProcedure.NotifyNewTask, param);
        }
    }
}
