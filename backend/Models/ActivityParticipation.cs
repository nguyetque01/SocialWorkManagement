using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ActivityParticipation
{
    public int Id { get; set; }

    public int? ActivitySessionId { get; set; }

    public int? StudentId { get; set; }

    public int? RegistrationStatus { get; set; }

    public int? AttendanceStatus { get; set; }

    public int? ApprovalAttendanceStatus { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ActivitySession? ActivitySession { get; set; }

    public virtual ICollection<AttendanceComplaint> AttendanceComplaints { get; set; } = new List<AttendanceComplaint>();

    public virtual User? Student { get; set; }
}
