using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Data.DBRepository.ResetToken
{
    public interface ITokenRepository
    {
        Task<ResetPasswordTokenModel> AddResetPasswordToken(long UserId, string Token);
        Task<ResetPasswordTokenModel> GetResetPasswordToken(string Token);
    }
}
