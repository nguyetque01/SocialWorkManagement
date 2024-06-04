using backend.Models;

namespace backend.DTOs
{
    public class ActivityParticipationDetailDto
    {
        public int Id { get; set; }
        public int? StudentId { get; set; }
        public string? StudentName { get; set; }
        public int? ActivityId { get; set; }
        public string? ActivityName { get; set; }
        public int? ActivitySessionId { get; set; }
        public string? Session { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public decimal? DaysCount { get; set; }
        public string? StatusText { get; set; }
        public string? RegistrationStatusText { get; set; }
        public string? AttendanceStatusText { get; set; }
        public string? ApprovalAttendanceStatusText { get; set; }
        public string? Description { get; set; }
    }
}
