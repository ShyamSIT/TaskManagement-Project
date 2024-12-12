using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Common.Helper;
using TaskManagement.Model;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.ResetToken
{
    public class TokenRepository(IConfiguration config, IOptions<ConnectionStrings> connectionString) : BaseRepository(connectionString) , ITokenRepository
    {
        public async Task<ResetPasswordTokenModel> AddResetPasswordToken(long UserId, string Token)
        {
            var ExpireTime = DateTime.Now.AddMinutes(10);
            var param = new DynamicParameters();
            param.Add("@UserId",UserId);
            param.Add("@Token",Token);
            param.Add("@ExpireTime",ExpireTime);

            return await QueryFirstOrDefaultAsync<ResetPasswordTokenModel>(StoreProcedure.AddResetPasswordToken, param, commandType: CommandType.StoredProcedure);
        }

        public async Task<ResetPasswordTokenModel> GetResetPasswordToken(string Token)
        {
            var param = new DynamicParameters();
            param.Add("@Token", Token);
            return await QueryFirstOrDefaultAsync<ResetPasswordTokenModel>(StoreProcedure.GetResetPasswordToken, param, commandType: CommandType.StoredProcedure);
        }
    }
}
