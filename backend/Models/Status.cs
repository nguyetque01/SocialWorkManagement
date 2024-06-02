using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Status
{
    public int Id { get; set; }

    public string StatusType { get; set; } = null!;

    public int? Code { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }
}
