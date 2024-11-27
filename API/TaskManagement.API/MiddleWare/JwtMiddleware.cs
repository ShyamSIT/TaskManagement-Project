
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace TaskManagement.API.MiddleWare
{
    public class JwtMiddleware : IMiddleware
    {
        private readonly IConfiguration _configuration;
        private readonly string _secretKey;
        public JwtMiddleware(IConfiguration configuration)
        {
            _configuration = configuration;
            _secretKey = _configuration["Jwt:Key"]!;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var authorizationHeader = context.Request.Headers["Authorization"].FirstOrDefault();

            if(!string.IsNullOrEmpty(authorizationHeader) )
            {
                var token = authorizationHeader.Replace("Bearer ", "").Trim().ToString();

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secretKey);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userEmail = jwtToken.Claims.First(x => x.Type == "LoggedInEmailId").Value;
                var userId = jwtToken.Claims.First(x => x.Type == "LoggedInUserId").Value;

                context.Items["User"] = new { userId, userEmail };

               
            }

            await next(context);
        }
    }
}
