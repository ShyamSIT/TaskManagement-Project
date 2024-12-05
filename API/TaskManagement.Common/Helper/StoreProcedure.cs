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
        public const string LoginUser  = "TM_SP_LoginUser";
        #endregion

        #region user
        public const string SaveUser = "TM_SP_AddUpdateUser";
        public const string GetUserByUserId = "TM_SP_GetUserByUserId";
        public const string GetUserList = "TM_SP_GetUserList";
        public const string GetAssignmentList = "TM_SP_GetAssignmentList";
        public const string SubmitAssignment = "TM_SP_SubmitAssignment";
        #endregion

        #region teacher
        public const string AddUpdateTask = "TM_SP_AddUpdateTask";
        public const string GetTaskList = "TM_SP_GetTaskList";
        public const string GetTaskByTaskId = "TM_SP_GetTaskByTaskId";
        public const string AssignTask = "TM_SP_AssignTask";
        public const string GetAllUsersByNotAssignTask = "TM_SP_GetAllUsersByNotAssignTask";
        public const string GetAssignmentListByTeacherId = "TM_SP_GetAssignmentListByTeacherId";
        public const string DeleteTask = "TM_SP_DeleteTask";
        #endregion

        #region RoleRight
        public const string GetRoleRightsById = "TM_SP_GetRoleRightsById";
        #endregion

    }
}
