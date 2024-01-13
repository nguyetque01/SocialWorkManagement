using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class AcademicYear
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
}
