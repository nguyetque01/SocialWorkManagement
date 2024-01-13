using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
