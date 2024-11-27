using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Model
{
    public class UserDetailModel
    {
        public long UserId {  get; set; }
        public string? FirstName {  get; set; }
	    public string? LastName { get;set;}
	    public string? Email { get;set;}
	    public string? Password { get; set; }
	    public long? RoleId { get; set; }
        public bool? IsActived { get; set; }
        public bool? IsDeleted { get; set; }
        public long CreatedBy { get; set; }
	    public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy {  get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
