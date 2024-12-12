using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Common.Helper;
using TaskManagement.Model;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Login
{
    public class LoginRepository(IConfiguration config, IOptions<ConnectionStrings> connectionString) : BaseRepository(connectionString), ILoginRepository
    {
        public async Task<int> DeleteResetPasswordToken(long UserId)
        {
            var param = new DynamicParameters();
            param.Add("@UserId",UserId);

            return await QueryFirstOrDefaultAsync<int>(StoreProcedure.DeleteResetPasswordToken,param,commandType: CommandType.StoredProcedure);
        }

        public async Task<UserDetailModel> GetUserByEmail(string Email)
        {
            var param = new DynamicParameters();
            param.Add("@Email", Email);
            
            return await QueryFirstOrDefaultAsync<UserDetailModel>(StoreProcedure.GetUserByEmail, param,commandType : CommandType.StoredProcedure);
        }

        public async Task<LoginModel> LoginUser(LoginModel loginModel)
        {
            var param = new DynamicParameters();
            param.Add("@Email", loginModel.Email);
            param.Add("@Password", loginModel.Password);

            return await QueryFirstOrDefaultAsync<LoginModel>(StoreProcedure.LoginUser, param, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> UpdatePassword(long UserId, string NewPassword)
        {
            var param = new DynamicParameters();
            param.Add("@UserId",UserId);
            param.Add("@NewPassword", NewPassword);

            return await QueryFirstOrDefaultAsync<int>(StoreProcedure.UpdatePassword, param, commandType: CommandType.StoredProcedure);
        }
    }
}
