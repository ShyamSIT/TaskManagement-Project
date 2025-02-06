using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Notification
{
    public interface INotificationRepository
    {
        public Task NotifyNewTask(NotificationModel task);
        public Task<List<NotificationModel>> GetAllNotificationByUserId(long UserId);
    }
}
