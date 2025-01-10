using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TaskManagement.Common;
using TaskManagement.Model;
using TaskManagement.Model.Model;
using TaskManagement.Service.TimeLog;

namespace TaskManagement.API.Controllers
{
    [Route("api/timeLog")]
    [ApiController]
    [Authorize]
    public class TimeLogAPIController(
         IConfiguration config,
         ITimeLogService timeLogService,
         IOptions<ApplicationSettings> appSettings) : ControllerBase
    {
        #region Fields
        private readonly IConfiguration _config = config;
        private readonly ITimeLogService _timeLogService = timeLogService;
        private readonly ApplicationSettings _appSettings = appSettings.Value;
        #endregion

        #region AddTimeLogTask
        [HttpPost("AddTimeLogTask")]
        public async Task<ApiPostResponse<TimeLogModel>> AddTimeLogTask(TimeLogModel timeLogModel)
        {
            ApiPostResponse<TimeLogModel> response = new();
            try
            {
                TimeLogModel model = await _timeLogService.AddTimeLogTask(timeLogModel);
                if (model != null && model.TimeLogId > 0)
                {
                    response.Data = model;
                    response.Success = true;
                    response.Message = "TimeLog Entry Added";
                }
                else
                {
                    response.Success = false;
                    response.Message = "Something went wrong";
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

        #region GetTimeLogListByUserId
        [HttpGet("GetTimeLogListByUserId")]
        public async Task<ApiResponse<TimeLogModel>> GetTimeLogListByUserId(long UserId)
        {
            ApiResponse<TimeLogModel> response = new() { Data = [] };
            try
            {
                List<TimeLogModel> timeLogList = await _timeLogService.GetTimeLogListByUserId(UserId);
                response.Data = timeLogList.OrderByDescending(m => m.TimeLogId).ToList();
                response.Success = true;
            }
            catch (Exception)
            {

                throw;
            }

            return response;
        }
        #endregion

        //#region GetTimeLogListByParentId 
        //[HttpPost("GetTimeLogListByParentId")]
        //public async Task<ApiResponse<TimeLogModel>> GetTimeLogListByParentId(TimeLogModel model)
        //{
        //    ApiResponse<TimeLogModel> response = new() { Data = [] };
        //    try
        //    {
        //        List<TimeLogModel> timeLogList = await _timeLogService.GetTimeLogListByUserId(model.UserId);
        //        List<TimeLogModel> timeLogs = timeLogList.Where(time => time.ParentId == model.TimeLogId).ToList();
        //        TimeLogModel? parentTimeLog = timeLogList.Where(time => time.TimeLogId == model.TimeLogId).FirstOrDefault();
        //        if (parentTimeLog != null)
        //        {
        //            timeLogs.Add(parentTimeLog); // Add the parent time log to the list
        //        }

        //        timeLogs = timeLogs.OrderByDescending(time => time.TimeLogId).ToList();
        //        response.Data = timeLogs;
        //        response.Success = true;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //    return response;
        //}
        //#endregion

        #region DeleteTimeLogIdById
        [HttpPost("DeleteTimeLogIdById")]
        public async Task<ApiPostResponse<string>> DeleteTimeLogIdById(TimeLogModel model)
        {
            ApiPostResponse<string> response = new();
            try
            {
                var result = await _timeLogService.DeleteTimeLogIdById(model.TimeLogId);
                if(result > 0)
                {
                    response.Success = true;
                    response.Data = "Deleted";
                }
                else
                {
                    response.Success = false;
                    response.Data = "Error occur";
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

        #region OnChangeSelectTaskId
        [HttpPost("OnChangeSelectTaskId")]
        public async Task<ApiPostResponse<string>> OnChangeSelectTaskId(TimeLogModel model)
        {
            ApiPostResponse<string> response = new();
            try
            {
                var result = await _timeLogService.OnChangeSelectTaskId(model);
                if (result > 0)
                {
                    response.Success = true;
                    response.Data = "Changed select task Id";
                }
                else
                {
                    response.Success = false;
                    response.Data = "Error occur";
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

    }
}
