using Quartz;
using TaskManagement.Service.Notification;

namespace TaskManagement.API
{
    public class LoggingBackgroundJob : IJob
    {
        private readonly ILogger<LoggingBackgroundJob> _logger;
        private readonly INotificationService _notificationService;

        public LoggingBackgroundJob(ILogger<LoggingBackgroundJob> logger, INotificationService notificationService)
        {
            _logger = logger;
            _notificationService = notificationService;
        }


        public async Task Execute(IJobExecutionContext context)
        {
            _logger.LogInformation("{UtcNow}", DateTime.UtcNow);
            await _notificationService.NotifyOverdueTasksAsync();
        }
    }
}
