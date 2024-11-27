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
        

        public async Task<LoginModel> LoginUser(LoginModel loginModel)
        {
            var param = new DynamicParameters();
            param.Add("@Email", loginModel.Email);
            param.Add("@Password", loginModel.Password);

            return await QueryFirstOrDefaultAsync<LoginModel>(StoreProcedure.LoginUser, param, commandType: CommandType.StoredProcedure);
        }

        
    }
}
