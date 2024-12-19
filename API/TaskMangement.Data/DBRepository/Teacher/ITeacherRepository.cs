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
        Task<List<TaskModel>> GetTaskList(long UserId);
        Task<TaskModel> GetTaskByTaskId(long TaskId);
        Task<long> AssignTask(AssignModel model);
        Task<List<UserDetailModel>> GetAllUsersByNotAssignTask(long TaskId);
        Task<List<AssignmentModel>> GetAssignmentListByTeacherId(long UserId);
        Task<long> DeleteTask(long TaskId);
        Task<FileModel> SaveFile(FileModel fileModel);
        Task<List<FileModel>> GetFileListByTeacherId(long UserId);
    }
}
