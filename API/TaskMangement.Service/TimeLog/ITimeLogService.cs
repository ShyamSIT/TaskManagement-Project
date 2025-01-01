using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.TimeLog
{
    public interface ITimeLogService
    {
        Task<TimeLogModel> AddTimeLogTask(TimeLogModel model);
        Task<List<TimeLogModel>> GetTimeLogListByUserId(long UserId);
        Task<int> DeleteTimeLogIdById(long TimeLogId);
    }
}
