using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TaskManagement.Common;
using TaskManagement.Model;
using TaskManagement.Model.Model;
using TaskManagement.Service.RoleRightMaster;

namespace TaskManagement.API.Controllers
{
    [Route("api/roleRight")]
    [ApiController]
    [Authorize]
    public class RoleRightMasterController(
         IConfiguration config,
         IRoleRightsService roleRightsService,
         IOptions<ApplicationSettings> appSettings) : ControllerBase
    {
        #region Fields
        private readonly IConfiguration _config = config;
        private readonly IRoleRightsService _roleRightsService =roleRightsService;
        private readonly ApplicationSettings _appSettings = appSettings.Value;
        #endregion
        [HttpGet("GetRoleRightsById")]
        public async Task<ApiPostResponse<RoleRightMasterModel>> GetRoleRightsById(long RoleId)
        {
            ApiPostResponse<RoleRightMasterModel> response = new();
            try
            {
                RoleRightMasterModel model = await _roleRightsService.GetRoleRightsById(RoleId);
                response.Data = model;
                response.Success = true;
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
    }
}
