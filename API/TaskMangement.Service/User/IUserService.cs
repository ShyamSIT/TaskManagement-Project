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
        Task<UserDetailModel> SaveUser(UserDetailModel userDetailModel);
        Task<UserDetailModel> GetUserByUserId(long UserId);
        Task<List<UserDetailModel>> GetUserList();
        Task<List<TaskModel>> GetTaskList();
        Task<List<AssignmentModel>> GetAssignmentList(long UserId);
        Task<AssignmentModel> SubmitAssignment(AssignmentModel model);
        Task<long> DeleteUser(long UserId);
    }
}
