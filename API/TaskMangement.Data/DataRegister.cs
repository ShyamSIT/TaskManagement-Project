using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.Login;
using TaskManagement.Data.DBRepository.ResetToken;
using TaskManagement.Data.DBRepository.RoleRightMaster;
using TaskManagement.Data.DBRepository.Teacher;
using TaskManagement.Data.DBRepository.TimeLog;
using TaskManagement.Data.DBRepository.User;

namespace TaskManagement.Data
{
    public static class DataRegister
    {
        public static Dictionary<Type,Type> GetTypes()
        {
            var dataDictionary = new Dictionary<Type, Type>
            {
                { typeof(ILoginRepository), typeof(LoginRepository) },
                { typeof(IUserRepository), typeof(UserRepostory) },
                { typeof(ITeacherRepository), typeof(TeacherRepository) },
                { typeof(IRoleRightsRepository), typeof(RoleRightsRepository) },
                { typeof(ITokenRepository), typeof(TokenRepository) },
                { typeof(ITimeLogRepository), typeof(TimeLogRepository) }
            };
            return dataDictionary;
        }
    }
}
