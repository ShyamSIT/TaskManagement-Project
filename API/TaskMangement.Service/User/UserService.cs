using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.Login;
using TaskManagement.Data.DBRepository.User;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.User
{
    public class UserService(IUserRepository repository) : IUserService
    {
        #region Fields
        private readonly IUserRepository _repository = repository;

        public async Task<long> DeleteUser(long UserId)
        {
            return await _repository.DeleteUser(UserId);
        }
        #endregion
        public async Task<List<AssignmentModel>> GetAssignmentList(long UserId)
        {
            return await _repository.GetAssignmentList(UserId);
        }

        public async Task<FileModel> GetFileByFileId(long FileId)
        {
            return await _repository.GetFileByFileId(FileId);
        }

        public async Task<List<TaskModel>> GetTaskList()
        {
            return await _repository.GetTaskList();
        }
        public async Task<UserDetailModel> GetUserByUserId(long UserId)
        {
            return await _repository.GetUserByUserId(UserId);
        }

        public Task<List<UserDetailModel>> GetUserList()
        {
            return _repository.GetUserList();
        }

        public async Task<UserDetailModel> SaveUser(UserDetailModel userDetailModel)
        {
            return await _repository.SaveUser(userDetailModel);
        }

        public async Task<AssignmentModel> SubmitAssignment(AssignmentModel model)
        {
            return await _repository.SubmitAssignment(model);
        }
    }
}
