namespace backend.Models
{
    public class AuthResponse
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string? Role { get; set; }
    }
}
