using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Common.Helper;
using TaskManagement.Model;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Teacher
{
    public class TeacherRepository(IOptions<ConnectionStrings> connectionString) : BaseRepository(connectionString), ITeacherRepository
    {
        public async Task<TaskModel> AddUpdateTask(TaskModel model)
        {
            var param = new DynamicParameters();
            param.Add("@TaskId",model.TaskId, DbType.Int64);
            param.Add("@TaskName",model.TaskName);
            param.Add("@Description",model.Description);
            param.Add("@Deadline",model.Deadline);
            param.Add("@UserId",model.UserId, DbType.Int64);

            return await QueryFirstOrDefaultAsync<TaskModel>(StoreProcedure.AddUpdateTask,param,commandType: CommandType.StoredProcedure);
        }

        public async Task<TaskModel> GetTaskByTaskId(long TaskId)
        {
            var param = new DynamicParameters();
            param.Add("@TaskId", TaskId, DbType.Int64);

            return await QueryFirstOrDefaultAsync<TaskModel>(StoreProcedure.GetTaskByTaskId,param,commandType : CommandType.StoredProcedure);
        }

        public async Task<List<TaskModel>> GetTaskList()
        {
            var data = await QueryAsync<TaskModel>(StoreProcedure.GetTaskList, commandType: CommandType.StoredProcedure);
            return data.ToList();
        }
    }
}

    
