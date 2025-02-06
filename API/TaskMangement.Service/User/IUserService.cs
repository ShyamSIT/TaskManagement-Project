using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.User
{
    public  interface IUserService
    {
        Task<UserModel> SaveUser(UserModel userDetailModel);
        Task<UserModel> GetUserByUserId(long UserId);
        Task<List<UserModel>> GetUserList();
        Task<List<UserModel>> GetAllUsers();  
        Task<List<TaskModel>> GetTaskList();
        Task<List<AssignmentModel>> GetAssignmentList(long UserId);
        Task<AssignmentModel> SubmitAssignment(AssignmentModel model);
        Task<long> DeleteUser(long UserId);
        Task<FileModel> GetFileByFileId(long FileId);
        Task<List<FileModel>> GetFileListByUserId(long UserId);
    }
}
