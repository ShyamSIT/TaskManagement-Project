using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TaskManagement.Common;
using TaskManagement.Data.DBRepository.Chat;
using TaskManagement.Model;
using TaskManagement.Model.Model;
using TaskManagement.Service.Chat;
using TaskManagement.Service.Notification;
using TaskManagement.Service.User;
namespace TaskManagement.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserAPIController(
        IConfiguration config,
        IUserService userService,
        INotificationService notificationService,
        IChatService chatService,
        IOptions<ApplicationSettings> appSettings) : ControllerBase
    {
        #region Fields
        private readonly IConfiguration _config = config;
        private readonly IUserService _userService = userService;
        private readonly INotificationService _notificationService = notificationService;
        private readonly IChatService _chatService  = chatService;
        private readonly ApplicationSettings _appSettings = appSettings.Value;
        #endregion

        #region Get
        [HttpGet("GetUserByUserId")]
        public async Task<ApiPostResponse<UserModel>> GetUserByUserId(long UserId)
        {
            ApiPostResponse<UserModel> response = new();
            try
            {
                UserModel userDetailModel = await _userService.GetUserByUserId(UserId);
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
        public async Task<ApiPostResponse<UserModel>> SaveUser([FromBody] UserModel model)
        {
            ApiPostResponse<UserModel> response = new();
            try
            {
                UserModel userDetailModel = await _userService.SaveUser(model);

                if (userDetailModel != null && userDetailModel.UserId > 0)
                {
                    response.Data = userDetailModel;
                    response.Success = true;
                    response.Message = "register successfully";

                }
                else if(userDetailModel != null && userDetailModel.UserId == -1)
                {
                    response.Success = false;
                    response.Message = "User Email already Exist";
                }else
                {
                    response.Success = false;
                    response.Message = "Something Went Wrong";
                }
            }
            catch (Exception)
            {

                throw;
            }

            return response;
        }
        #endregion

        //Only get for the student list
        #region get
        [HttpGet("GetUserList")]
        public async Task<ApiResponse<UserModel>> GetUserList()
        {
            ApiResponse<UserModel> response = new() { Data = [] };
            try
            {
                List<UserModel> users = await _userService.GetUserList();
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

        //get all users include the teachers and students
        #region get
        [HttpGet("GetAllUsers")]
        public async Task<ApiResponse<UserModel>> GetAllUsers()
        {
            ApiResponse<UserModel> response = new() { Data = [] };
            try
            {
                List<UserModel> users = await _userService.GetAllUsers();
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

        #region GetAssignmentList
        [HttpGet("GetAssignmentList")]
        public async Task<ApiResponse<AssignmentModel>> GetAllUsersByNotAssignTask(long UserId)
        {
            ApiResponse<AssignmentModel> response = new() { Data = [] };
            try
            {
                List<AssignmentModel> assignments = await _userService.GetAssignmentList(UserId);
                response.Success = true;
                response.Data = assignments;
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
        #endregion

        #region SubmitAssignment
        [HttpPost("SubmitAssignment")]
        public async Task<ApiPostResponse<AssignmentModel>> SubmitAssignment(AssignmentModel model)
        {
            ApiPostResponse<AssignmentModel> response = new();
            try
            {
                AssignmentModel assignment = await _userService.SubmitAssignment(model);
                if (assignment != null && assignment.AssignmentId > 0)
                {
                    response.Success = true;
                    response.Data = assignment;
                    response.Message = "Submit Successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Something went Wrong";
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return response;
        }
        #endregion

        #region DeleteUser
        [HttpGet("DeleteUser")]
        public async Task<ApiPostResponse<string>> DeleteUser(long UserId)
        {
            ApiPostResponse<string> response = new();
            try
            {
                var res = await _userService.DeleteUser(UserId);
                if (res == 1)
                {
                    response.Success = true;
                    response.Data = "Delete User Successfully";
                }
                else
                {
                    response.Success = false;
                    response.Data = "Something went to wrong";
                }
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
        #endregion

        #region GetFileListByUserId
        [HttpGet("GetFileListByUserId")]
        public async Task<ApiResponse<FileModel>> GetFileListByUserId(long UserId)
        {
            ApiResponse<FileModel> response = new() { Data = [] };

            try
            {
                var files = await _userService.GetFileListByUserId(UserId);
                response.Data = files;
                response.Success = true;
                response.Message = "Get File list";
            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }
        #endregion

        #region DownloadPdf
        [HttpGet("DownloadPdf")]
        public async Task<IActionResult> DownloadPdf(string FileName)
        {

            // Path to the PDF file
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "UploadFiles", FileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("PDF file not found.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);

            return File(fileBytes, "application/pdf", FileName); // File result with a filename for download
        }
        #endregion

        #region GetAllNotifications
        [HttpGet("GetAllNotifications")]
        public async Task<ApiResponse<NotificationModel>> GetAllNotifications(long UserId)
        {
            ApiResponse<NotificationModel> response = new() { Data = [] };
            try
            {
                List<NotificationModel> notifications = await _notificationService.GetAllNotificationByUserId(UserId);
                response.Data = notifications;
                response.Success = true;
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
        #endregion

        [HttpPost("GetAllChatMessages")]
        public async Task<ApiResponse<ChatMessageModel>> GetAllChatMessages(ChatMessageModel model)
        {
            ApiResponse<ChatMessageModel> res = new() { Data = [] }; 
            try
            {
                res.Data = await _chatService.GetAllChatMessages(model);
                res.Success = true;
            }
            catch (Exception)
            {

                throw;
            }

                return res;
        }
    }
}
