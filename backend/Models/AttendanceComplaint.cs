using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class AttendanceComplaint
{
    public int Id { get; set; }

    public int? ActivityParticipationId { get; set; }

    public string? EvidenceUrl { get; set; }

    public int? RequestStatus { get; set; }

    public int? ApprovalStatus { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ActivityParticipation? ActivityParticipation { get; set; }
}
