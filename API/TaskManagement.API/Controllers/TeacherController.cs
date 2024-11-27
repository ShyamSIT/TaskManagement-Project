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
        ITeacherService teacherService) : ControllerBase
    {
        #region fields
        private readonly ITeacherService _teacherService = teacherService;
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

        #region GetTaskList
        [HttpGet("GetTaskList")]
        public async Task<ApiResponse<TaskModel>> GetTaskList()
        {
            ApiResponse<TaskModel> response = new() { Data = [] };
            try
            {
                List<TaskModel> list = await _teacherService.GetTaskList();
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
        [HttpPost("GetTaskByTaskId")]
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
    }
}
