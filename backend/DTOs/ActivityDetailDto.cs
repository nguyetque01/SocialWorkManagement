using Microsoft.CodeAnalysis.Elfie.Serialization;

namespace backend.DTOs
{
    public class ActivityDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Location { get; set; }
        public string? AcademicYear { get; set; }
        public string? ActivityCategory { get; set; }
        public DateTime? ReleaseTime { get; set; }
        public string? StatusText { get; set; }
        public string? Description { get; set; }
        public int? TotalDays { get; set; }
        public DateOnly? ActivityStartDate { get; set; }
        public DateOnly? ActivityEndDate { get; set; }
        public DateTime? RegistrationStartTime { get; set; }
        public DateTime? RegistrationEndTime { get; set; }
    }
}
