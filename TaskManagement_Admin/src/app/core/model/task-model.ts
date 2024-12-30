export interface TaskModel{
    TaskId : number,
    TaskName : string,
    Description : string,
    Deadline : any,
    UserId : number,
    Priority : string
}

export interface TimeLogModel {
    TimeLogId : number,
    TimeLogText : string,
    TaskId : number,
    UserId : number,
    StartTime : any,
    EndTime : any,
    TaskName : string,
    ParentId : number,
}