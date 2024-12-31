import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ApiUrlHelper {
    public apiUrl = {
        login : { 
            loginUser : 'login/LoginUser',
            forgetPassword : 'login/ForgetPassword',
            resetPassword : 'login/ResetPassword', 
        },
        user : {
            saveUser : 'user/SaveUser',
            getUserByUserId : 'user/GetUserByUserId',
            getUserList : 'user/GetUserList',
            getTaskList : 'user/GetTaskList',
            getAssignmentList : 'user/GetAssignmentList',
            submitAssignment : 'user/SubmitAssignment',
            deleteUser  : 'user/DeleteUser',
            getFileListByUserId : 'user/GetFileListByUserId',
            downloadPdf : 'user/DownloadPdf'
        },
        teacher : {
            addUpdateTask : 'teacher/AddUpdateTask',
            getTaskByTaskId : 'teacher/GetTaskByTaskId',
            getTaskList : 'teacher/GetTaskList',
            assignTask : 'teacher/AssignTask',
            getAllUsersByNotAssignTask : 'teacher/GetAllUsersByNotAssignTask',
            getAssignmentListByTeacherId : 'teacher/GetAssignmentListByTeacherId',
            deleteTask : 'teacher/DeleteTask',
            uploadFile : 'teacher/UploadFile',
            getFileListByTeacherId : 'teacher/GetFileListByTeacherId',
            viewPdf : 'teacher/ViewPdf',
        },
        timeLog : {
            addTimeLogTask : 'timeLog/AddTimeLogTask',
            getTimeLogListByUserId : 'timeLog/GetTimeLogListByUserId',
            getTimeLogListByParentId : 'timeLog/GetTimeLogListByParentId',
            addUpdateTimeLogTiming : 'timeLog/AddUpdateTimeLogTiming',
            deleteTimeLogIdById : 'timeLog/DeleteTimeLogIdById'
        },
        roleRight : {
            getRoleRightsById : 'roleRight/GetRoleRightsById',
        }
    }
}