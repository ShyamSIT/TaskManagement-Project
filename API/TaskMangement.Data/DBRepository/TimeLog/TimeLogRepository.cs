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

namespace TaskManagement.Data.DBRepository.TimeLog
{
    public class TimeLogRepository(IOptions<ConnectionStrings> connectionStrings) : BaseRepository(connectionStrings), ITimeLogRepository
    {
        public async Task<TimeLogModel> AddTimeLogTask(TimeLogModel model)
        {

            if (model.StartTime != null)
            {
                model.StartTime = DateTime.Now;
                model.EndTime = DateTime.Now;
            }
            else
            {
                model.StartTime = null;
                model.EndTime = DateTime.Now;
            }
            var param = new DynamicParameters();
            param.Add("@TimeLogId", model.TimeLogId);
            param.Add("@TimeLogText", model.TimeLogText);
            param.Add("@TaskId", model.TaskId);
            param.Add("@StartTime", model.StartTime);
            param.Add("@EndTime", model.EndTime);
            param.Add("@UserId", model.UserId);
            param.Add("@ParentId", model.TimeLogId);

            return await QueryFirstOrDefaultAsync<TimeLogModel>(StoreProcedure.AddTimeLogTask, param);
        }

        public async Task<int> DeleteTimeLogIdById(long TimeLogId)
        {
            var param = new DynamicParameters();
            param.Add("@TimeLogId", TimeLogId);

            return await QueryFirstOrDefaultAsync<int>(StoreProcedure.DeleteTimeLogIdById, param);
        }

        public async Task<List<TimeLogModel>> GetTimeLogListByUserId(long UserId)
        {
            var param = new DynamicParameters();
            param.Add("@UserId", UserId);

            var data = await QueryAsync<TimeLogModel>(StoreProcedure.GetTimeLogListByUserId, param);
            return data.ToList();
        } 
    }
 }
