using Business_Layer.Services;
using Data_Access_Layer.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Presentation_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _userService;

        public AuthController(IAuthService authService)
        {
            _userService = authService;
        }

      
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }



        [HttpPost("LoginUser")]
        public async Task<IActionResult> Login([FromBody] LoginDto userLoginDto)
        {
            try
            {
                var token = await _userService.AuthenticateAsync(userLoginDto);

                if (token == null)
                {
                    return Unauthorized("Invalid email or password.");
                }

                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                if (ex.Message == "User is banned.")
                {
                    return Unauthorized("User is banned.");
                }
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost("RegisterUser")]
        public async Task<IActionResult> Register([FromBody] UserDto userRegisterDto)
        {
            var token = await _userService.RegisterAsync(userRegisterDto);

            if (token == null)
            {
                return BadRequest("User registration failed.");
            }

            return Ok(new { Token = token });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserDto userDto)
        {
            if (id != userDto.UserId)
            {
                return BadRequest();
            }

            try
            {
                await _userService.UpdateUser(id, userDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}
