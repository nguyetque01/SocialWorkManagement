using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ActivitySession
{
    public int Id { get; set; }

    public int? ActivityId { get; set; }

    public DateOnly? ActivityDate { get; set; }

    public string? Session { get; set; }

    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public int? DaysCount { get; set; }

    public int? MaxParticipants { get; set; }

    public DateTime? RegistrationStartTime { get; set; }

    public DateTime? RegistrationEndTime { get; set; }

    public int? RegistrationAcceptanceStatus { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual Activity? Activity { get; set; }

    public virtual ICollection<ActivityParticipation> ActivityParticipations { get; set; } = new List<ActivityParticipation>();
}
