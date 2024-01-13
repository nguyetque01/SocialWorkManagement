using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ActionType
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<RecordHistory> RecordHistories { get; set; } = new List<RecordHistory>();
}
