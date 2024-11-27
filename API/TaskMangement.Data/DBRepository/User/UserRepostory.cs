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

namespace TaskManagement.Data.DBRepository.User
{
    public class UserRepostory(IConfiguration config, IOptions<ConnectionStrings> connectionString) : BaseRepository(connectionString), IUserRepository
    {
        public async Task<UserDetailModel> GetUserByUserId(long UserId)
        {
            var param = new DynamicParameters();
            param.Add("@UserId", UserId);

            return await QueryFirstOrDefaultAsync<UserDetailModel>(StoreProcedure.GetUserByUserId, param, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<UserDetailModel>> GetUserList()
        {
            var data = await QueryAsync<UserDetailModel>(StoreProcedure.GetUserList,commandType : CommandType.StoredProcedure);
            return data.ToList();
        }

        public async Task<UserDetailModel> SaveUser(UserDetailModel model)
        {
            var param = new DynamicParameters();
            param.Add("@UserId", model.UserId);
            param.Add("@FirstName", model.FirstName);
            param.Add("@LastName", model.LastName);
            param.Add("@Email", model.Email);
            param.Add("@Password", model.Password);
            param.Add("@RoleId", model.RoleId);
            param.Add("@CreatedBy", model.UserId);
            UserDetailModel m = await QueryFirstOrDefaultAsync<UserDetailModel>(StoreProcedure.SaveUser, param, commandType: CommandType.StoredProcedure);
            return m;
        }
        public async Task<List<TaskModel>> GetTaskList()
        {
            var data = await QueryAsync<TaskModel>(StoreProcedure.GetTaskList, commandType: CommandType.StoredProcedure);
            return data.ToList();
        }
    }
}
