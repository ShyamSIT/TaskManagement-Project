using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;
using TaskManagement.Common;
using TaskManagement.Model;
using TaskManagement.Model.Model;
using TaskManagement.Service.User;

namespace TaskManagement.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserAPIController(
        IConfiguration config,
        IUserService userService,
        IOptions<ApplicationSettings> appSettings) : ControllerBase
    {
        #region Fields
        private readonly IConfiguration _config = config;
        private readonly IUserService _userService = userService;
        private readonly ApplicationSettings _appSettings = appSettings.Value;
        #endregion

        #region Get
        [HttpGet("GetUserByUserId")]
        public async Task<ApiPostResponse<UserDetailModel>> GetUserByUserId(long UserId)
        {
            ApiPostResponse<UserDetailModel> response = new();
            try
            {
                UserDetailModel userDetailModel = await _userService.GetUserByUserId(UserId);
                response.Data = userDetailModel;
            }
            catch (Exception)
            {

                throw;
            }

            return response;
        }
        #endregion

        #region Post
        [HttpPost("SaveUser")]
        [AllowAnonymous]
        public async Task<ApiPostResponse<UserDetailModel>> SaveUser([FromBody] UserDetailModel model)
        {
            ApiPostResponse<UserDetailModel> response = new();
            try
            {
                UserDetailModel userDetailModel = await _userService.SaveUser(model);
        
                if(userDetailModel != null && userDetailModel.UserId > 0) {
                    response.Data = userDetailModel;
                    response.Success = true;
                    response.Message = "register successfully";

                }
                else
                {
                    response.Success = false;
                    response.Message = "Something went wrong";
                }
            }
            catch (Exception)
            {

                throw;
            }

            return response;
        }
        #endregion

        #region get
        [HttpGet("GetUserList")]
        public async Task<ApiResponse<UserDetailModel>> GetUserList()
        {
            ApiResponse<UserDetailModel> response = new() { Data = [] };
            try
            {
                List<UserDetailModel> users = await _userService.GetUserList();
                response.Data = users;
                response.Success = true;    
            }
            catch (Exception)
            {

                throw;
            }

            return response;
        }
        #endregion

        #region GetTaskList
        [HttpGet("GetTaskList")]
        public async Task<ApiResponse<TaskModel>> GetTaskList()
        {
            ApiResponse<TaskModel> response = new() { Data = [] };
            try
            {
                List<TaskModel> tasks = await _userService.GetTaskList();
                response.Data = tasks;
                response.Success = true;
            }
            catch (Exception)
            {

                throw;
            }

            return response;
        }
        #endregion
    }
}
