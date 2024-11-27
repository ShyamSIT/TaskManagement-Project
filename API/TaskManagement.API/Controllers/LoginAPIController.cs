using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;
using TaskManagement.Common;
using TaskManagement.Model;
using TaskManagement.Model.Model;
using TaskManagement.Service.Login;

namespace TaskManagement.API.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginAPIController(
        IConfiguration config,
        ILoginService loginService,
        IOptions<ApplicationSettings> appSettings) : ControllerBase
    {
        #region Fields
        private readonly IConfiguration _config = config;
        private readonly ILoginService _loginService = loginService;
        private readonly ApplicationSettings _appSettings = appSettings.Value;
        #endregion

        #region Post
        [HttpPost("LoginUser")]
        public async Task<ApiPostResponse<LoginModel>> LoginUser([FromBody] LoginModel model)
        {
            ApiPostResponse<LoginModel> response = new ();
            {
                try
                {
                    LoginModel loginModel = await _loginService.LoginUser(model);

                    if (loginModel != null && loginModel.FirstName != null)
                    {
                        loginModel.JwtToken = JwtToken.GenerateJSONWebToken(loginModel.Email ?? string.Empty, loginModel.UserId.ToString(), loginModel.RoleId.ToString(), _config["Jwt:Key"]);
                        // Set success to true if login was successful
                        response.Data = loginModel;
                        response.Success = true;
                        response.Message = "Login successful.";
                    }
                    else
                    {
                        // If login fails (e.g., invalid credentials)
                        response.Success = false;
                        response.Message = "Invalid username or password.";
                    }
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }

            return response;
        }
        #endregion


    }
}