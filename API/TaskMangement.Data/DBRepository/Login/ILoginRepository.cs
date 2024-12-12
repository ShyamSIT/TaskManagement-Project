using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Login
{
    public interface ILoginRepository
    {
        Task<LoginModel> LoginUser(LoginModel loginModel);
        Task<UserDetailModel> GetUserByEmail(string Email);
        Task<int> UpdatePassword(long UserId, string NewPassword);
        Task<int> DeleteResetPasswordToken(long UserId);
    }
}
