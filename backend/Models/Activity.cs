using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Activity
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Location { get; set; }

    public int? AcademicYearId { get; set; }

    public int? ActivityCategoryId { get; set; }

    public DateTime? ReleaseTime { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual AcademicYear? AcademicYear { get; set; }

    public virtual ActivityCategory? ActivityCategory { get; set; }

    public virtual ICollection<ActivitySession> ActivitySessions { get; set; } = new List<ActivitySession>();
}
