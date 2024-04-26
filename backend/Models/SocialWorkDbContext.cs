using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class SocialWorkDbContext : DbContext
{
    public SocialWorkDbContext()
    {
    }

    public SocialWorkDbContext(DbContextOptions<SocialWorkDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AcademicYear> AcademicYears { get; set; }

    public virtual DbSet<ActionType> ActionTypes { get; set; }

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<ActivityCategory> ActivityCategories { get; set; }

    public virtual DbSet<ActivityParticipation> ActivityParticipations { get; set; }

    public virtual DbSet<ActivitySession> ActivitySessions { get; set; }

    public virtual DbSet<AttendanceComplaint> AttendanceComplaints { get; set; }

    public virtual DbSet<Class> Classes { get; set; }

    public virtual DbSet<Faculty> Faculties { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<NotificationType> NotificationTypes { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<RecordHistory> RecordHistories { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RolePermission> RolePermissions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=SocialWorkDB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AcademicYear>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Academic__3214EC27D42E4B4A");

            entity.ToTable("AcademicYear");

            entity.HasIndex(e => e.Name, "UQ__Academic__737584F6B8C9FAF1").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.EndTime).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StartTime).HasColumnType("datetime");
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<ActionType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ActionTy__3214EC2752C7D4FD");

            entity.ToTable("ActionType");

            entity.HasIndex(e => e.Name, "UQ__ActionTy__737584F67D468B62").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<Activity>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Activity__3214EC27608D9DD1");

            entity.ToTable("Activity");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AcademicYearId).HasColumnName("AcademicYearID");
            entity.Property(e => e.ActivityCategoryId).HasColumnName("ActivityCategoryID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.ReleaseTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.AcademicYear).WithMany(p => p.Activities)
                .HasForeignKey(d => d.AcademicYearId)
                .HasConstraintName("FK_ActivityAcademicYearID");

            entity.HasOne(d => d.ActivityCategory).WithMany(p => p.Activities)
                .HasForeignKey(d => d.ActivityCategoryId)
                .HasConstraintName("FK_ActivityActivityCategoryID");
        });

        modelBuilder.Entity<ActivityCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Activity__3214EC273301C07F");

            entity.ToTable("ActivityCategory");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.ParentCategoryId).HasColumnName("ParentCategoryID");
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.Faculty).WithMany(p => p.ActivityCategories)
                .HasForeignKey(d => d.FacultyId)
                .HasConstraintName("FK_ActivityCategoryFacultyID");
        });

        modelBuilder.Entity<ActivityParticipation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Activity__3214EC27EB486835");

            entity.ToTable("ActivityParticipation");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ActivitySessionId).HasColumnName("ActivitySessionID");
            entity.Property(e => e.ApprovalAttendanceStatus).HasDefaultValue(0);
            entity.Property(e => e.AttendanceStatus).HasDefaultValue(0);
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.RegistrationStatus).HasDefaultValue(1);
            entity.Property(e => e.Status).HasDefaultValue(0);
            entity.Property(e => e.StudentId).HasColumnName("StudentID");

            entity.HasOne(d => d.ActivitySession).WithMany(p => p.ActivityParticipations)
                .HasForeignKey(d => d.ActivitySessionId)
                .HasConstraintName("FK_ActivityParticipation_ActivitySession");

            entity.HasOne(d => d.Student).WithMany(p => p.ActivityParticipations)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_ActivityParticipation_Student");
        });

        modelBuilder.Entity<ActivitySession>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Activity__3214EC27455E4B47");

            entity.ToTable("ActivitySession");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ActivityId).HasColumnName("ActivityID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.RegistrationEndTime).HasColumnType("datetime");
            entity.Property(e => e.RegistrationStartTime).HasColumnType("datetime");
            entity.Property(e => e.RegistrationStatus).HasDefaultValue(0);
            entity.Property(e => e.Session).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.Activity).WithMany(p => p.ActivitySessions)
                .HasForeignKey(d => d.ActivityId)
                .HasConstraintName("FK_ActivitySessionActivityID");
        });

        modelBuilder.Entity<AttendanceComplaint>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Attendan__3214EC27C1F7B381");

            entity.ToTable("AttendanceComplaint");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ActivityParticipationId).HasColumnName("ActivityParticipationID");
            entity.Property(e => e.ApprovalStatus).HasDefaultValue(0);
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.EvidenceUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EvidenceURL");
            entity.Property(e => e.RequestStatus).HasDefaultValue(1);
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.ActivityParticipation).WithMany(p => p.AttendanceComplaints)
                .HasForeignKey(d => d.ActivityParticipationId)
                .HasConstraintName("FK_AttendanceComplaint_ActivityParticipation");
        });

        modelBuilder.Entity<Class>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Class__3214EC27BCBFD6D5");

            entity.ToTable("Class");

            entity.HasIndex(e => e.Name, "UQ__Class__737584F61A009B2D").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AdvisorId).HasColumnName("AdvisorID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.Faculty).WithMany(p => p.Classes)
                .HasForeignKey(d => d.FacultyId)
                .HasConstraintName("FK_ClassFacultyID");
        });

        modelBuilder.Entity<Faculty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Faculty__3214EC27F26DEB1D");

            entity.ToTable("Faculty");

            entity.HasIndex(e => e.Name, "UQ__Faculty__737584F6634CE649").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3214EC2784625140");

            entity.ToTable("Notification");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Content).HasMaxLength(1000);
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(0);
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.TypeId).HasColumnName("TypeID");

            entity.HasOne(d => d.SentToNavigation).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.SentTo)
                .HasConstraintName("FK_NotificationSentTo");

            entity.HasOne(d => d.Type).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK_NotificationTypeID");
        });

        modelBuilder.Entity<NotificationType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3214EC27FA45AAD6");

            entity.ToTable("NotificationType");

            entity.HasIndex(e => e.Name, "UQ__Notifica__737584F6ABCA0FE4").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Permissi__3214EC279B32121B");

            entity.ToTable("Permission");

            entity.HasIndex(e => e.Name, "UQ__Permissi__737584F6F1F926E6").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<RecordHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RecordHi__3214EC277C001FDC");

            entity.ToTable("RecordHistory");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ActionTime).HasColumnType("datetime");
            entity.Property(e => e.ActionTypeId).HasColumnName("ActionTypeID");
            entity.Property(e => e.ActorId).HasColumnName("ActorID");
            entity.Property(e => e.DeviceUsed).HasMaxLength(255);
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.RecordId).HasColumnName("RecordID");
            entity.Property(e => e.TableName)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.ActionType).WithMany(p => p.RecordHistories)
                .HasForeignKey(d => d.ActionTypeId)
                .HasConstraintName("FK_RecordHistory_ActionType");

            entity.HasOne(d => d.Actor).WithMany(p => p.RecordHistories)
                .HasForeignKey(d => d.ActorId)
                .HasConstraintName("FK_RecordHistory_ActorID");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC27FE03A916");

            entity.HasIndex(e => e.Name, "UQ__Roles__737584F6B42D7CEE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RolePerm__3214EC273947D94F");

            entity.ToTable("RolePermission");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.PermissionId).HasColumnName("PermissionID");
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.Permission).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.PermissionId)
                .HasConstraintName("FK_RolePermissionPermissionID");

            entity.HasOne(d => d.Role).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_RolePermissionRoleID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC2705EC6462");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D1053465FDCED0").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.ClassId).HasColumnName("ClassID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");
            entity.Property(e => e.FullName).HasMaxLength(255);
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.Class).WithMany(p => p.Users)
                .HasForeignKey(d => d.ClassId)
                .HasConstraintName("FK_UserClassID");

            entity.HasOne(d => d.Faculty).WithMany(p => p.Users)
                .HasForeignKey(d => d.FacultyId)
                .HasConstraintName("FK_UserFacultyID");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_UserRoleID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
