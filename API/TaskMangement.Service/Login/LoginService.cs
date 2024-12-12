using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.Login;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.Login
{
    public class LoginService(ILoginRepository repository) : ILoginService
    {

        #region Fields
        private readonly ILoginRepository _repository = repository;

        
        #endregion

        public async Task<LoginModel> LoginUser(LoginModel loginModel)
        {
           return await _repository.LoginUser(loginModel);
        }
        public async Task<UserDetailModel> GetUserByEmail(string Email)
        {
            return await _repository.GetUserByEmail(Email);
        }

        public async Task<int> UpdatePassword(long UserId, string NewPassword)
        {
            return await _repository.UpdatePassword(UserId, NewPassword);
        }

        public Task<int> DeleteResetPasswordToken(long UserId)
        {
            return _repository.DeleteResetPasswordToken(UserId);
        }
    }
}
