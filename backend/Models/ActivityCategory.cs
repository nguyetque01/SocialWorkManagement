using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ActivityCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? FacultyId { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();

    public virtual Faculty? Faculty { get; set; }
}
