using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Model
{
    public class TaskModel
    {
        public long TaskId { get; set; }
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public DateTime Deadline { get; set; }
        public long UserId { get; set; }
        public string? Priority { get; set; }   
    }
}
