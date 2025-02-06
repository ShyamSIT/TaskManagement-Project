using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.Notification;
using TaskManagement.Data.DBRepository.User;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.Notification
{
    public class NotificationService(INotificationRepository notificationRepository,IUserRepository userRepository) : INotificationService
    {
        #region Fields
        private readonly INotificationRepository _notificationRepository = notificationRepository;
        private readonly IUserRepository _userRepository = userRepository;
        #endregion
        public async Task<List<NotificationModel>> GetAllNotificationByUserId(long UserId)
        {
            return await _notificationRepository.GetAllNotificationByUserId(UserId);
        }

        public async Task NotifyNewTask(NotificationModel task)
        {
            await _notificationRepository.NotifyNewTask(task);
        }

        public async Task NotifyOverdueTasksAsync()
        {
            var currentDate = DateTime.Now;
            List<AssignmentModel> list = await _userRepository.GetAssignmentList(0);

            list = list.Where(t => t.AssignDate < currentDate && t.IsCompleted == false).ToList();


            foreach(var task in list)
            {
                NotificationModel model = new NotificationModel
                {
                    NotificationId = 0,
                    UserId = task.UserId,
                    TaskId = task.TaskId,
                    Message = $"Task OverDue : {task.TaskName}"
                };

                await _notificationRepository.NotifyNewTask(model);
            }

        }
    }
}
