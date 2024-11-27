using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManagement.API;
using TaskManagement.API.MiddleWare;
using TaskManagement.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        //builder.WithOrigins(Array.Empty<string>()) // Removed trailing slash
        //       .AllowAnyHeader()
        //       .AllowAnyMethod()
        //       .AllowCredentials();

        builder.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
    });
});

builder.Services.Configure<ConnectionStrings>(builder.Configuration.GetSection("ConnectionStrings"));

var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true; // Optional: Set to true if token retrieval is needed
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.RegisterServices();
builder.Services.AddSingleton<JwtMiddleware>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null; // Keep properties as defined in the class
    });

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware configuration
app.UseRouting(); // Routing should be added first
app.UseCors("AllowSpecificOrigins"); // Place after UseRouting
app.UseAuthentication(); // Authentication middleware
app.UseMiddleware<JwtMiddleware>(); // Custom middleware
app.UseAuthorization();

app.MapControllers();

app.Run();
