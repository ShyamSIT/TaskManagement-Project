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

        public async Task<TaskModel> GetTaskByTaskId(long TaskId)
        {
            return await _repository.GetTaskByTaskId(TaskId);
        }

        public async Task<List<TaskModel>> GetTaskList()
        {
            return await _repository.GetTaskList();
        }
    }
}
