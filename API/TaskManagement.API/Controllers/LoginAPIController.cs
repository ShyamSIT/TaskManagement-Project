using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using System.Text;
using TaskManagement.Common;
using TaskManagement.Model;
using TaskManagement.Model.Model;
using TaskManagement.Service.Login;
using TaskManagement.Service.ResetToken;

namespace TaskManagement.API.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginAPIController(
        IConfiguration config,
        ILoginService loginService,
        ITokenService tokenService,
        IOptions<ApplicationSettings> appSettings) : ControllerBase
    {
        #region Fields
        private readonly IConfiguration _config = config;
        private readonly ILoginService _loginService = loginService;
        private readonly ITokenService _tokenService = tokenService;
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

        #region ForgetPassword
        [HttpPost("ForgetPassword")]
        [AllowAnonymous]

        public async Task<BaseApiResponse> ForgetPassword(UserAuthModel model)
        {
            BaseApiResponse response = new BaseApiResponse();
            try
            {
                UserAuthModel AuthModel = new()
                {
                    Email = model.Email,
                };
                UserDetailModel user = await _loginService.GetUserByEmail(AuthModel?.Email);
                if (user != null && user.UserId > 0)
                {
                    //generate the token 
                    var token = Guid.NewGuid().ToString();


                    //base url for the reset password
                    var callBackUrl = $"http://localhost:4200/auth/reset-password?Token={token}";

                    await _tokenService.AddResetPasswordToken(user.UserId, token);

                    //base path
                    var basepath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplate");
                    using StreamReader reader = new(Path.Combine(basepath, "ResetPassword.html"));
                    string emailBody = reader.ReadToEnd();
                    emailBody = emailBody.Replace("##FirstName##", user.FirstName);
                    emailBody = emailBody.Replace("##ResetPasswordLink##", callBackUrl);

                    var isSuccess = SentMailMessage(AuthModel.Email, emailBody);

                    response.Success = true;
                    response.Message = "Successfully sent email";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Something Went Wrong";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }
        #endregion
        #region ResetPassword
        [HttpPost("ResetPassword")]
        [AllowAnonymous]
        public async Task<BaseApiResponse> ResetPassword(UserAuthModel model)
        {
            BaseApiResponse response = new();
            try
            {
                ResetPasswordTokenModel resetPasswordTokenModel = await _tokenService.ValidateResetToken(model.Token);

                if(resetPasswordTokenModel != null && resetPasswordTokenModel.UserId > 0)
                {
                    var result = await _loginService.UpdatePassword(resetPasswordTokenModel.UserId, model?.NewPassword);

                    if(result != 0)
                    {

                        await _loginService.DeleteResetPasswordToken(resetPasswordTokenModel.UserId);

                        response.Success = true;
                        response.Message = "Reset Password Successfully";
                    }
                    else
                    {
                        response.Success = false;
                        response.Message = "Something went wrong";
                    }
                }
                else
                {
                    response.Success = false;
                    response.Message = "Reset Password Link Was Expired";
                }

            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = ex.Message;
            }
            return response;
        }

        #endregion

        private bool SentMailMessage(string email, string emailBody)
        {
            

            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(_config["EmailConfiguration:From"], _config["EmailConfiguration:Fromname"]);
                mailMessage.Subject = "Reset Password";
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = emailBody;
                mailMessage.To.Add(new MailAddress(email));

                var smtp = new SmtpClient(_config["EmailConfiguration:EmailHostName"]);
                smtp.Port = Convert.ToInt32(_config["EmailConfiguration:Port"]);
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(_config["EmailConfiguration:Username"], _config["EmailConfiguration:Password"]);

                smtp.Send(mailMessage);
                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }


    }
}