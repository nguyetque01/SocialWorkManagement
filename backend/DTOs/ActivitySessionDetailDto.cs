using backend.Models;

namespace backend.DTOs
{
    public class ActivitySessionDetailDto
    {
        public int Id { get; set; }

        public int? ActivityId { get; set; }

        public string? ActivityName { get; set; }

        public DateOnly? ActivityDate { get; set; }

        public string? Session { get; set; }

        public TimeOnly? StartTime { get; set; }

        public TimeOnly? EndTime { get; set; }

        public decimal? DaysCount { get; set; }

        public int? MaxParticipants { get; set; }

        public DateTime? RegistrationStartTime { get; set; }

        public DateTime? RegistrationEndTime { get; set; }

        public string? RegistrationAcceptanceStatusText { get; set; }

        public string? StatusText { get; set; }

        public string? Description { get; set; }

    }
}
