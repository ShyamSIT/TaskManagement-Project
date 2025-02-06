using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Model
{
    public class NotificationModel
    {
        public long NotificationId { get; set; }
        public long UserId { get; set; }
        public long TaskId { get; set; }
        public string? Message { get; set; }
        public bool? IsRead { get; set; } 
    }
}
