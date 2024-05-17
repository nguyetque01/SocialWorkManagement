using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using backend.Services;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SocialWorkDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(SocialWorkDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] AuthRequest request)
        {
            try
            {
                if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                {
                    return BadRequest("Invalid request data.");
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user == null || user.Password != request.Password)
                {
                    return BadRequest("Invalid email or password.");
                }

                var token = _tokenService.CreateToken(user);

                var roleName = await _context.Users
                    .Where(u => u.Email == user.Email)
                    .Select(u => u.Role != null ? u.Role.Name : "Unknown")
                    .FirstOrDefaultAsync();

                Response.Cookies.Append("UserId", user.Id.ToString());
                Response.Cookies.Append("UserEmail", user.Email);
                Response.Cookies.Append("UserRole", roleName);

                return Ok(new AuthResponse
                {
                    Id = user.Id.ToString(),
                    Email = user.Email,
                    Role = roleName,
                    Token = token,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [HttpGet]
        [Route("account")]
        public async Task<ActionResult<User>> GetAccount()
        {
            try
            {
                var userId = Request.Cookies["UserId"];
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User not authenticated.");
                }

                var user = await _context.Users.FindAsync(int.Parse(userId));
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> Logout()
        {
            try
            {
                var userId = Request.Cookies["UserId"];
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User not authenticated.");
                }

                Response.Cookies.Delete("UserId");
                Response.Cookies.Delete("UserEmail");
                Response.Cookies.Delete("UserRole");

                return Ok("Logout successful.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


    }
}
