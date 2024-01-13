using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Class
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? AdvisorId { get; set; }

    public int? FacultyId { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual Faculty? Faculty { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
