using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class NotificationType
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
