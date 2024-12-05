using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Common.Helper;
using TaskManagement.Model;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.RoleRightMaster
{
    public class RoleRightsRepository(IOptions<ConnectionStrings> connectionString) : BaseRepository(connectionString), IRoleRightsRepository
    {
        public async Task<RoleRightMasterModel> GetRoleRightsById(long RoleId)
        {
            var param = new DynamicParameters();
            param.Add("@RoleId", RoleId);

            var list = await QueryAsync<RoleRightsMasterModel>(StoreProcedure.GetRoleRightsById, param, commandType: System.Data.CommandType.StoredProcedure);

            RoleRightMasterModel model =  new RoleRightMasterModel();
            model.RoleId = RoleId;
            model.RoleRights = list.ToList();

            return model;
        }
    }
}
