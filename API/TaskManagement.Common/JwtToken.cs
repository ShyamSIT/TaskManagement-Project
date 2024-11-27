  using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace TaskManagement.Common
{
    public static class JwtToken
    {

        public static string GenerateJSONWebToken(string EmailAddress,string UserId,string RoleId,string SecretKey)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                   new("LoggedInEmailId",EmailAddress),
                   new("LoggedInUserId", UserId)
                }),
                Expires = DateTime.Now.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey)), SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityTokenHandler tokenHandler = new();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(securityToken);
        }

    }
}
