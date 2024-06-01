using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Status
{
    public int Id { get; set; }

    public int? Code { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }
}
