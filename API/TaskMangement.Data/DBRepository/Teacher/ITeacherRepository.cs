using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Teacher
{
    public interface ITeacherRepository
    {
        Task<TaskModel> AddUpdateTask(TaskModel model);
        Task<List<TaskModel>> GetTaskList();
        Task<TaskModel> GetTaskByTaskId(long TaskId);
    }
}
