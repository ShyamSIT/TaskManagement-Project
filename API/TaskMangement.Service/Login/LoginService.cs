using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.Login;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.Login
{
    public class LoginService(ILoginRepository repository) : ILoginService
    {

        #region Fields
        private readonly ILoginRepository _repository = repository;
        #endregion
       
        public async Task<LoginModel> LoginUser(LoginModel loginModel)
        {
           return await _repository.LoginUser(loginModel);
        }
    }
}
