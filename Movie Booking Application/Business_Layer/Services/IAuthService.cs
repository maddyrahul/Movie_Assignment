using Data_Access_Layer.DTOs;

namespace Business_Layer.Services
{
    public interface IAuthService
    {
        Task<IEnumerable<UserDto>> GetAllUsers();
        Task<UserDto> GetUserById(int id);
        Task<string> RegisterAsync(UserDto userRegisterDto);
        Task<string> AuthenticateAsync(LoginDto userLoginDto);
        Task<UserDto> UpdateUser(int id, UserDto userDto);
        Task DeleteUser(int id);
    }

}
