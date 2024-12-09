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
            if(model.Priority == null)
            {
                model.Priority = "Medium";
            }
            var param = new DynamicParameters();
            param.Add("@TaskId",model.TaskId, DbType.Int64);
            param.Add("@TaskName",model.TaskName);
            param.Add("@Description",model.Description);
            param.Add("@Deadline",model.Deadline);
            param.Add("@UserId",model.UserId, DbType.Int64);
            param.Add("@Priority",model.Priority);
            return await QueryFirstOrDefaultAsync<TaskModel>(StoreProcedure.AddUpdateTask,param,commandType: CommandType.StoredProcedure);
        }

        public async Task<long> AssignTask(AssignModel model)
        {
            for(int i = 0; i < model?.StudentIds?.Length; i++)
            {
                AssignmentModel assignmentModel = new AssignmentModel();
                assignmentModel.TaskId = model.TaskId;
                assignmentModel.UserId = model.StudentIds[i];

                var param = new DynamicParameters();
                param.Add("@AssignmentId", assignmentModel.AssignmentId);
                param.Add("@TaskId",assignmentModel.TaskId);
                param.Add("@UserId", assignmentModel.UserId);
                param.Add("@IsCompleted", assignmentModel.IsCompleted);

                assignmentModel = await QueryFirstOrDefaultAsync<AssignmentModel>(StoreProcedure.AssignTask, param, commandType: CommandType.StoredProcedure);
                if(assignmentModel != null && assignmentModel.AssignmentId > 0)
                {
                    continue;
                }
                else
                {
                    return 0;
                }

            }

            return 1;
        }

        public async Task<long> DeleteTask(long TaskId)
        {
            var param = new DynamicParameters();
            param.Add("@TaskId", TaskId);

            return await QueryFirstOrDefaultAsync<long>(StoreProcedure.DeleteTask, param, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<UserDetailModel>> GetAllUsersByNotAssignTask(long TaskId)
        {
            var param = new DynamicParameters();
            param.Add("@TaskId", TaskId);

            var data = await QueryAsync<UserDetailModel>(StoreProcedure.GetAllUsersByNotAssignTask,param,commandType : CommandType.StoredProcedure);
            return data.ToList();
        }

        public async Task<List<AssignmentModel>> GetAssignmentListByTeacherId(long UserId)
        {
            var param = new DynamicParameters();
            param.Add("@UserId", UserId);

            var data = await QueryAsync<AssignmentModel>(StoreProcedure.GetAssignmentListByTeacherId, param, commandType: CommandType.StoredProcedure);
            return data.ToList();
        }

        public async Task<TaskModel> GetTaskByTaskId(long TaskId)
        {
            var param = new DynamicParameters();
            param.Add("@TaskId", TaskId, DbType.Int64);

            return await QueryFirstOrDefaultAsync<TaskModel>(StoreProcedure.GetTaskByTaskId,param,commandType : CommandType.StoredProcedure);
        }

        public async Task<List<TaskModel>> GetTaskList(long UserId)
        {
            var param = new DynamicParameters();
            param.Add("UserId", UserId);
            var data = await QueryAsync<TaskModel>(StoreProcedure.GetTaskList, param,commandType: CommandType.StoredProcedure);
            return data.ToList();
        }
    }
}

    
