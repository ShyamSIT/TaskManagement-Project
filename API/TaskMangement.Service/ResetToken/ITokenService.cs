using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.ResetToken
{
    public interface ITokenService
    {
        Task<ResetPasswordTokenModel> AddResetPasswordToken(long UserId, string Token);
        Task<ResetPasswordTokenModel> GetResetPasswordToken(string Token);
        Task<ResetPasswordTokenModel> ValidateResetToken(string Token);
    }
}
