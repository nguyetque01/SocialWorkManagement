using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class User
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public DateOnly? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string Address { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public int? RoleId { get; set; }

    public int? FacultyId { get; set; }

    public int? ClassId { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<ActivityParticipation> ActivityParticipations { get; set; } = new List<ActivityParticipation>();

    public virtual Class? Class { get; set; }

    public virtual Faculty? Faculty { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<RecordHistory> RecordHistories { get; set; } = new List<RecordHistory>();

    public virtual Role? Role { get; set; }
}
