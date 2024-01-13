using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Notification
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public int? TypeId { get; set; }

    public int? SentTo { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual User? SentToNavigation { get; set; }

    public virtual NotificationType? Type { get; set; }
}
