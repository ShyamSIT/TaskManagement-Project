using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Model
{
    public class FileModel
    {
        public long FileId { get; set; }
        public string? FileName { get; set; }
        public long? UserId {  get; set; }
        public long? TaskId { get; set;}
        public string? TaskName {  get; set; }
    }
}
