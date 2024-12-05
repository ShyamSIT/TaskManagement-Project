using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.Teacher;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.Teacher
{
    public class TeacherService(ITeacherRepository repository) : ITeacherService
    {
        private readonly ITeacherRepository _repository = repository;

        public async Task<TaskModel> AddUpdateTask(TaskModel model)
        {
            return await _repository.AddUpdateTask(model);
        }

        public async Task<long> AssignTask(AssignModel model)
        {
            return await _repository.AssignTask(model);
        }

        public async Task<long> DeleteTask(long TaskId)
        {
            return await _repository.DeleteTask(TaskId);
        }

        public async Task<List<UserDetailModel>> GetAllUsersByNotAssignTask(long TaskId)
        {
            return await _repository.GetAllUsersByNotAssignTask(TaskId);
        }

        public async Task<List<AssignmentModel>> GetAssignmentListByTeacherId(long UserId)
        {
            return await _repository.GetAssignmentListByTeacherId(UserId);
        }

        public async Task<TaskModel> GetTaskByTaskId(long TaskId)
        {
            return await _repository.GetTaskByTaskId(TaskId);
        }

        public async Task<List<TaskModel>> GetTaskList(long UserId)
        {
            return await _repository.GetTaskList(UserId);
        }
    }
}
