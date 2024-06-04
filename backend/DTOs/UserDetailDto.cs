namespace backend.DTOs
{
    public class UserDetailDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
        public string FullName { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? RoleName { get; set; }
        public string? FacultyName { get; set; }
        public string? ClassName { get; set; }
        public string? StatusText { get; set; }
        public string? Description { get; set; }
    }
}
