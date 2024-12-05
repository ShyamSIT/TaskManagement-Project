using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.RoleRightMaster;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.RoleRightMaster
{
    public class RoleRightsService(IRoleRightsRepository repository) : IRoleRightsService
    {
        #region Fields
        private readonly IRoleRightsRepository _repository = repository;
        #endregion
        public async Task<RoleRightMasterModel> GetRoleRightsById(long RoleId)
        {
            return await _repository.GetRoleRightsById(RoleId);
        }
    }
}
