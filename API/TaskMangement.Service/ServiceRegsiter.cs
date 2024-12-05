using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Service.Login;
using TaskManagement.Service.RoleRightMaster;
using TaskManagement.Service.Teacher;
using TaskManagement.Service.User;

namespace TaskManagement.Service
{
    public static class ServiceRegister
    {
        public static Dictionary<Type, Type> GetTypes()
        {
            var dataDictionary = new Dictionary<Type, Type>
            {
                { typeof(ILoginService), typeof(LoginService) },
                { typeof(IUserService), typeof(UserService) },
                { typeof(ITeacherService), typeof(TeacherService) },
                { typeof(IRoleRightsService), typeof(RoleRightsService) },
            };
            return dataDictionary;
        }
    }
}
