import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ApiUrlHelper {
    public apiUrl = {
        login : { 
            loginUser : 'login/LoginUser' 
        },
        user : {
            saveUser : 'user/SaveUser',
            getUserByUserId : 'user/GetUserByUserId',
            getUserList : 'user/GetUserList',
            getTaskList : 'user/GetTaskList',
            getAssignmentList : 'user/GetAssignmentList',
            submitAssignment : 'user/SubmitAssignment',
            deleteUser  : 'user/DeleteUser'
        },
        teacher : {
            addUpdateTask : 'teacher/AddUpdateTask',
            getTaskByTaskId : 'teacher/GetTaskByTaskId',
            getTaskList : 'teacher/GetTaskList',
            assignTask : 'teacher/AssignTask',
            getAllUsersByNotAssignTask : 'teacher/GetAllUsersByNotAssignTask',
            getAssignmentListByTeacherId : 'teacher/GetAssignmentListByTeacherId',
            deleteTask : 'teacher/DeleteTask'
        },
        roleRight : {
            getRoleRightsById : 'roleRight/GetRoleRightsById',
        }
    }
}