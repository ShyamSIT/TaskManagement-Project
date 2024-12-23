using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Common.Helper
{
    public static class StoreProcedure
    {

        #region Login
        public const string LoginUser = "TM_SP_LoginUser";
        public const string GetUserByEmail = "TM_SP_GetUserByEmail";
        public const string UpdatePassword = "TM_SP_UpdatePassword";
        public const string DeleteResetPasswordToken = "TM_SP_DeleteResetPasswordToken";
        #endregion

        #region user
        public const string SaveUser = "TM_SP_AddUpdateUser";
        public const string GetUserByUserId = "TM_SP_GetUserByUserId";
        public const string GetUserList = "TM_SP_GetUserList";
        public const string GetAssignmentList = "TM_SP_GetAssignmentList";
        public const string SubmitAssignment = "TM_SP_SubmitAssignment";
        public const string DeleteUser = "TM_SP_DeleteUser";
        public const string GetFileByFileId = "TM_SP_GetFileByFileId";
        public const string GetFileListByUserId = "TM_SP_GetFileListByUserId";
        #endregion

        #region teacher
        public const string AddUpdateTask = "TM_SP_AddUpdateTask";
        public const string GetTaskList = "TM_SP_GetTaskList";
        public const string GetTaskByTaskId = "TM_SP_GetTaskByTaskId";
        public const string AssignTask = "TM_SP_AssignTask";
        public const string GetAllUsersByNotAssignTask = "TM_SP_GetAllUsersByNotAssignTask";
        public const string GetAssignmentListByTeacherId = "TM_SP_GetAssignmentListByTeacherId";
        public const string DeleteTask = "TM_SP_DeleteTask";
        public const string SaveFile = "TM_SP_SaveFile";
        public const string GetFileListByTeacherId = "TM_SP_GetFileListByTeacherId";
        #endregion

        #region RoleRight
        public const string GetRoleRightsById = "TM_SP_GetRoleRightsById";
        #endregion

        #region ResetToken
        public const string AddResetPasswordToken = "TM_Sp_AddResetPasswordToken";
        public const string GetResetPasswordToken = "TM_SP_GetResetPasswordToken";
        #endregion

    }
}
