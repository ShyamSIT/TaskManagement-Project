using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Common;
using TaskManagement.Model.Model;
using TaskManagement.Service.Teacher;

namespace TaskManagement.API.Controllers
{
    [Route("api/teacher")]
    [ApiController]
    [Authorize]
    public class TeacherController(
        ITeacherService teacherService,
        IWebHostEnvironment environment) : ControllerBase
    {
        #region fields
        private readonly ITeacherService _teacherService = teacherService;
        private readonly IWebHostEnvironment _environment = environment;
        #endregion

        #region AddUpdateTask
        [HttpPost("AddUpdateTask")]
        public async Task<ApiPostResponse<TaskModel>> AddUpdateTask(TaskModel model)
        {
            
            ApiPostResponse<TaskModel> response = new();
            try
            {
                TaskModel taskModel = await _teacherService.AddUpdateTask(model);
                if (taskModel != null && taskModel.TaskId > 0)
                {
                    response.Data = taskModel;
                    response.Success = true;
                    response.Message = "Added or Updated successfully";
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

        #region GetTaskList
        [HttpGet("GetTaskList")]
        public async Task<ApiResponse<TaskModel>> GetTaskList(long UserId)
        {
            ApiResponse<TaskModel> response = new() { Data = [] };
            try
            {
                
                List<TaskModel> list = await _teacherService.GetTaskList(UserId);
                response.Data = list;
                response.Success = true;

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return response;
        }
        #endregion

        #region GetTaskByTaskId
        [HttpGet("GetTaskByTaskId")]
        public async Task<ApiPostResponse<TaskModel>> GetTaskByTaskId(long TaskId)
        {
            ApiPostResponse<TaskModel> response = new();
            try
            {
                TaskModel task = await _teacherService.GetTaskByTaskId(TaskId);
                response.Data = task;
                response.Success = true;
            }
            catch (Exception)
            {

                throw;
            }

            return response;
        }
        #endregion

        #region AssignTask
        [HttpPost("AssignTask")]
        public async Task<ApiPostResponse<string>> AssignTask(AssignModel assignModel)
        {
            ApiPostResponse<string> response = new();
            try
            {
                var res = await _teacherService.AssignTask(assignModel);
                if (res == 1)
                {
                    response.Success = true;
                    response.Data = "Assign Task Successfully";
                }
                else
                {
                    response.Success = false;
                    response.Data = "Something went to wrong";
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return response;
        }
        #endregion

        #region GetAllUsersByNotAssignTask
        [HttpGet("GetAllUsersByNotAssignTask")]
        public async Task<ApiResponse<UserDetailModel>> GetAllUsersByNotAssignTask(long TaskId)
        {
            ApiResponse<UserDetailModel> response = new() { Data = [] };
            try
            {
                List<UserDetailModel> users = await _teacherService.GetAllUsersByNotAssignTask(TaskId);
                response.Success = true;
                response.Data = users;
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
        #endregion

        #region GetAssignmentListByTeacherId
        [HttpGet("GetAssignmentListByTeacherId")]
        public async Task<ApiResponse<AssignmentModel>> GetAssignmentListByTeacherId(long UserId)
        {
            ApiResponse<AssignmentModel> response = new() { Data = [] };
            try
            {
                response.Data = await _teacherService.GetAssignmentListByTeacherId(UserId);
                response.Success = true;
                response.Message = "GetAssignmentListByTeacherId";
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
        #endregion

        #region DeleteTask
        [HttpGet("DeleteTask")]
        public async Task<ApiPostResponse<string>> DeleteTask(long TaskId)
        {
            ApiPostResponse<string> response = new();
            try
            {
                var res = await _teacherService.DeleteTask(TaskId);
                if (res == 1)
                {
                    response.Success = true;
                    response.Data = "Delete Task Successfully";
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

        #region Upload
        [HttpPost("UploadFile")]
        public async Task<BaseApiResponse> UploadFile(IFormFile file,[FromForm] FileModel fileModel)
        {
            BaseApiResponse response = new();
            try
            {
                if(file.Length < 0)
                {
                    response.Success = false;
                    response.Message = "Please Upload the file first!!";
                    return response;
                }
                //save file in backend 
                await SaveFileAsync(file);

                //save filename in database
                fileModel.FileName = file.FileName;
                FileModel res = await _teacherService.SaveFile(fileModel);

                if(res != null && res.FileId > 0)
                {
                    response.Success = true;
                    response.Message = "File Upload Successfully";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Can't Duplicate file upload!";
                }
                
            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message =  ex.Message;
            }

            return response;
        }
        #endregion

        #region GetFileListByTeacherId
        [HttpGet("GetFileListByTeacherId")]
        public async Task<ApiResponse<FileModel>> GetFileListByTeacherId(long UserId)
        {
            ApiResponse<FileModel> response = new() { Data = [] };

            try
            {
                var files = await _teacherService.GetFileListByTeacherId(UserId);
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

        #region ConvertingFileToString
        [NonAction]
        public async Task<bool> SaveFileAsync(IFormFile file)
        {

            try
            {

                string uploadPath = Path.Combine(_environment.WebRootPath, "UploadFiles");
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                string filePath = Path.Combine(uploadPath, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return true;

            }
            catch (Exception ex)
            {

                return false;
            }
        }
        #endregion

        #region ViewUploadPdf
        [HttpGet("ViewPdf")]
        public async Task<ApiPostResponse<string>> ViewPdf(string FileName)
        {
            var filePath = Path.Combine("UploadFiles",FileName);
            ApiPostResponse<string> response = new();
            try
            {
                response.Success = true;
                response.Data = filePath;
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
