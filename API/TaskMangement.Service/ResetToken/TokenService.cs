using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Data.DBRepository.ResetToken;
using TaskManagement.Model.Model;

namespace TaskManagement.Service.ResetToken
{
    public class TokenService(ITokenRepository repository) : ITokenService
    {
        #region Fields
        private readonly ITokenRepository _tokenRepository = repository;
        #endregion

        public async Task<ResetPasswordTokenModel> AddResetPasswordToken(long UserId, string Token)
        {
            return await _tokenRepository.AddResetPasswordToken(UserId, Token);
        }

        public async Task<ResetPasswordTokenModel> GetResetPasswordToken(string Token)
        {
            return await _tokenRepository.GetResetPasswordToken(Token);
        }

        public async Task<ResetPasswordTokenModel> ValidateResetToken(string Token)
        {

            ResetPasswordTokenModel resetToken = await GetResetPasswordToken(Token);

            if(resetToken !=  null && resetToken.ExpireTime > DateTime.Now)
            {
                return resetToken;
            }

            return null;
        }


    }
}
