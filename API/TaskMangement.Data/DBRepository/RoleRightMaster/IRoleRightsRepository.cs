﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.RoleRightMaster
{
    public interface IRoleRightsRepository
    {
        Task<RoleRightMasterModel> GetRoleRightsById(long RoleId);
    }
}
