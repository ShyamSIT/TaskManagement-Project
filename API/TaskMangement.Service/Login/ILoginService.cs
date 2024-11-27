using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.Login
{
    public interface ILoginService
    {
        Task<LoginModel> LoginUser(LoginModel loginModel);
    }
}
