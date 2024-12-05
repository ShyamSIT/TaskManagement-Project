using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.RoleRightMaster
{
    public interface IRoleRightsService
    {
        Task<RoleRightMasterModel> GetRoleRightsById(long RoleId);
    }
}
