using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.TimeLog;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.TimeLog
{
    public class TimeLogService(ITimeLogRepository repository) : ITimeLogService
    {
        #region Fields
        private readonly ITimeLogRepository _repository = repository;
        #endregion
        public async Task<TimeLogModel> AddTimeLogTask(TimeLogModel model)
        {
            return await _repository.AddTimeLogTask(model);
        }

        public async Task<int> DeleteTimeLogIdById(long TimeLogId)
        {
            return await _repository.DeleteTimeLogIdById(TimeLogId);
        }

        public async Task<List<TimeLogModel>> GetTimeLogListByUserId(long UserId)
        {
            return await _repository.GetTimeLogListByUserId(UserId);
        }

        public async Task<int> OnChangeSelectTaskId(TimeLogModel timeLog)
        {
            return await _repository.OnChangeSelectTaskId(timeLog);
        }
    }
}
