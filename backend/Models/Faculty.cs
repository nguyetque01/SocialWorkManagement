using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Faculty
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<ActivityCategory> ActivityCategories { get; set; } = new List<ActivityCategory>();

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
