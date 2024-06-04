using System;
using System.Collections.Generic;
using backend.DTOs;
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

    public DbSet<UserDetailDto> UserDetails { get; set; }

    public DbSet<ActivityDetailDto> ActivityDetails { get; set; }

    public DbSet<ActivitySessionDetailDto> ActivitySessionDetails { get; set; }

    public DbSet<ActivityParticipationDetailDto> ActivityParticipationDetails { get; set; }

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

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=SocialWorkDB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AcademicYear>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Academic__3214EC270C787138");

            entity.ToTable("AcademicYear");

            entity.HasIndex(e => e.Name, "UQ__Academic__737584F637DBF788").IsUnique();

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
            entity.HasKey(e => e.Id).HasName("PK__ActionTy__3214EC27D4A09F8B");

            entity.ToTable("ActionType");

            entity.HasIndex(e => e.Name, "UQ__ActionTy__737584F62803ACC2").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<Activity>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Activity__3214EC272406908F");

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
            entity.HasKey(e => e.Id).HasName("PK__Activity__3214EC2757F79E18");

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
            entity.HasKey(e => e.Id).HasName("PK__Activity__3214EC27DC25CB0A");

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
            entity.HasKey(e => e.Id).HasName("PK__Activity__3214EC274F893E13");

            entity.ToTable("ActivitySession");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ActivityId).HasColumnName("ActivityID");
            entity.Property(e => e.DaysCount).HasColumnType("decimal(3, 1)");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.RegistrationAcceptanceStatus).HasDefaultValue(0);
            entity.Property(e => e.RegistrationEndTime).HasColumnType("datetime");
            entity.Property(e => e.RegistrationStartTime).HasColumnType("datetime");
            entity.Property(e => e.Session).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.Activity).WithMany(p => p.ActivitySessions)
                .HasForeignKey(d => d.ActivityId)
                .HasConstraintName("FK_ActivitySessionActivityID");
        });

        modelBuilder.Entity<AttendanceComplaint>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Attendan__3214EC273F87C44E");

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
            entity.HasKey(e => e.Id).HasName("PK__Class__3214EC2797D33FC6");

            entity.ToTable("Class");

            entity.HasIndex(e => e.Name, "UQ__Class__737584F65D9FD5BF").IsUnique();

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
            entity.HasKey(e => e.Id).HasName("PK__Faculty__3214EC27C3C01BD4");

            entity.ToTable("Faculty");

            entity.HasIndex(e => e.Name, "UQ__Faculty__737584F6F91C10EC").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3214EC2750B446D0");

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
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3214EC2784A35EA9");

            entity.ToTable("NotificationType");

            entity.HasIndex(e => e.Name, "UQ__Notifica__737584F6E1597D3A").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Permissi__3214EC279245B28B");

            entity.ToTable("Permission");

            entity.HasIndex(e => e.Name, "UQ__Permissi__737584F69C7D8D13").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<RecordHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RecordHi__3214EC27EB933604");

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
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC277668CE21");

            entity.HasIndex(e => e.Name, "UQ__Roles__737584F6FE245EA7").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(0);
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RolePerm__3214EC27AB500DC2");

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

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Status__3214EC2740AB3CF4");

            entity.ToTable("Status");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Code).HasDefaultValue(0);
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.StatusType).HasMaxLength(50);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC271E123E83");

            entity.HasIndex(e => e.Code, "UQ__Users__A25C5AA7BB19D576").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Users__A9D105343BF43F05").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.ClassId).HasColumnName("ClassID");
            entity.Property(e => e.Code)
                .HasMaxLength(255)
                .IsUnicode(false);
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
