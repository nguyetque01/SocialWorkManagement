using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class RecordHistory
{
    public int Id { get; set; }

    public string TableName { get; set; } = null!;

    public int? RecordId { get; set; }

    public int? ActionTypeId { get; set; }

    public int? ActorId { get; set; }

    public DateTime? ActionTime { get; set; }

    public string? Description { get; set; }

    public string? DeviceUsed { get; set; }

    public string? Location { get; set; }

    public virtual ActionType? ActionType { get; set; }

    public virtual User? Actor { get; set; }
}
