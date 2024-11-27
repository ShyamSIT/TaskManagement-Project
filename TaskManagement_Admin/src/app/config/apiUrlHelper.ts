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
        },
        teacher : {
            addUpdateTask : 'teacher/AddUpdateTask',
            getTaskByTaskId : 'teacher/GetTaskByTaskId',
            getTaskList : 'teacher/GetTaskList'
        }
    }
}