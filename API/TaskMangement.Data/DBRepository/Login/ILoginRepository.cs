using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.Login
{
    public interface ILoginRepository
    {
        Task<LoginModel> LoginUser(LoginModel loginModel);
    }
}
