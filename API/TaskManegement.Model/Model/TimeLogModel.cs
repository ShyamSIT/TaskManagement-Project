using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Model
{
    public class TimeLogModel
    {
        public long TimeLogId { get; set; }
        public string? TimeLogText { get; set; }
        public long? TaskId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public long? ParentId { get; set; }
        public long UserId { get; set; }
        public string? TaskName { get; set; }
        public string? Message { get; set; }
    }
}
