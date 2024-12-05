using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Model
{
    public class AssignmentModel
    {
        public long AssignmentId { get; set; }
        public long TaskId { get; set; }
        public string? TaskName { get; set; }
        public DateTime? Deadline { get; set; }
        public long UserId { get; set; }
        public string? UserName { get; set;}
        public bool? IsCompleted { get; set; }
        public DateTime? AssignDate { get; set; }

    }

    public class AssignModel
    {
        public long TaskId { get; set; }
        public long[]? StudentIds { get; set; }
        
    }

}
