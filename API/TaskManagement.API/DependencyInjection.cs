using Quartz;

namespace TaskManagement.API
{
    public static class DependencyInjection
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            try
            {

                services.AddQuartz(options =>
                {
                    options.UseMicrosoftDependencyInjectionJobFactory();

                    var jobkey = JobKey.Create(nameof(LoggingBackgroundJob));

                    options.AddJob<LoggingBackgroundJob>(jobkey)
                           .AddTrigger(trigger => trigger
                           .ForJob(jobkey)
                           .WithIdentity("NotificationJob-trigger")
                           .WithCronSchedule("0 0 17 * * ?")
                           );
                });

                services.AddQuartzHostedService(options =>
                {
                    options.WaitForJobsToComplete = true;
                });
                Console.WriteLine("Quartz service has been added.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding Quartz service: {ex.Message}");
                throw;
            }
        }
    }
}
