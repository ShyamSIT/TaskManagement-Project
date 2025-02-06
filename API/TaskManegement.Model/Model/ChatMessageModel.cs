using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Model
{
    public class ChatMessageModel
    {
        public long MessageId { get; set; }
        public long SenderId {  get; set; }
        public long ReceiverId { get; set; }
        public string? MessageText { get; set; }
        public bool IsRead { get; set; }
        public DateTime SentAt { get; set; }
    }
}
