using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Model    
{
    public  class ResetPasswordTokenModel
    {
        public int ResetPasswordTokenId { get; set; }
        public long UserId { get; set; }
        public string? Token { get; set; }
        public DateTime ExpireTime { get; set; }
    }
}
