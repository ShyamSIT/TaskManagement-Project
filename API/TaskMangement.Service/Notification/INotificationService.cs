using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.Notification
{
    public interface INotificationService
    {
        public Task NotifyNewTask(NotificationModel task);
        public Task NotifyOverdueTasksAsync();
        public Task<List<NotificationModel>> GetAllNotificationByUserId(long UserId);
    }
}
