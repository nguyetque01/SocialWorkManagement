----------------0. CREATE DATABASE ----------------
-- Tạo database SocialWorkDB
CREATE DATABASE SocialWorkDB 
ON (
	NAME = 'SocialWorkDB_data',
	FILENAME = 'D:\data\SocialWorkDB_data.mdf',
	SIZE = 10MB,
	MAXSIZE = 100MB,
	FILEGROWTH = 5MB
)
LOG ON (
	NAME = 'SocialWorkDB_log',
	FILENAME = 'D:\data\SocialWorkDB_log.ldf',
	SIZE = 5MB,
	MAXSIZE = 50MB,
	FILEGROWTH = 1MB
);
GO

-- Sử dụng database
USE SocialWorkDB
GO

----------------- 1. TẠO BẢNG ------------------
---------------- Bảng Userss ---------------
CREATE TABLE Users (
    ID INT IDENTITY(1,1) PRIMARY KEY ,
    Email VARCHAR(255) UNIQUE NOT NULL CHECK (Email LIKE '%_@__%.__%'),
    Password VARCHAR(255) NOT NULL CHECK (LEN(Password) >= 8),
    FullName NVARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    Gender VARCHAR(10) CHECK (Gender IN ('Male', 'Female', 'Other')),
    Address NVARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20) CHECK (PhoneNumber LIKE '[0-9]' AND LEN(PhoneNumber) BETWEEN 8 AND 20),
    RoleID INT,
    FacultyID INT,
    ClassID INT,
    Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255),

    -- Ràng buộc kiểm tra định dạng ngày sinh
    CHECK (DateOfBirth IS NULL OR (DateOfBirth <= GETDATE() AND DateOfBirth >= '1900-01-01'))
);


---------------- Bảng Role ---------------
CREATE TABLE Roles (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) UNIQUE NOT NULL,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng Permission ----------------
CREATE TABLE Permission (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) UNIQUE NOT NULL,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng RolePermission ----------------
CREATE TABLE RolePermission (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    RoleID INT,
    PermissionID INT,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng AcademicYear ----------------
CREATE TABLE AcademicYear (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL,
    StartTime DATETIME,
    EndTime DATETIME,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255),
	
    -- Ràng buộc kiểm tra thời gian bắt đầu không sau thời gian kết thúc
    CHECK (StartTime IS NULL OR EndTime IS NULL OR StartTime <= EndTime)
);

---------------- Bảng Faculty ---------------
CREATE TABLE Faculty (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) UNIQUE NOT NULL,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng Class ---------------
CREATE TABLE Class (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) UNIQUE NOT NULL,
    AdvisorID INT,
    FacultyID INT,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng ActivityCategory ---------------
CREATE TABLE ActivityCategory (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    FacultyID INT,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng Activity ---------------
CREATE TABLE Activity (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Location NVARCHAR(255),
    AcademicYearID INT,
    ActivityCategoryID INT,
	ReleaseTime DATETIME,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng ActivitySession ---------------
CREATE TABLE ActivitySession (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    ActivityID INT,
    ActivityDate DATE,
    Session NVARCHAR(50),
    StartTime TIME,
    EndTime TIME,
    DaysCount INT,
    MaxParticipants INT,
    RegistrationStartTime DATETIME,
    RegistrationEndTime DATETIME,
	RegistrationStatus INT DEFAULT 0 CHECK (RegistrationStatus IN (0, 1, -1)),
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

-- Ràng buộc kiểm tra thời gian bắt đầu và kết thúc
ALTER TABLE ActivitySession
ADD CONSTRAINT CK_TimeRange CHECK (StartTime < EndTime);

-- Ràng buộc kiểm tra số ngày CTXH không âm
ALTER TABLE ActivitySession
ADD CONSTRAINT CK_DaysCount CHECK (DaysCount >= 0);

-- Ràng buộc kiểm tra số lượng người tham gia tối đa không âm
ALTER TABLE ActivitySession
ADD CONSTRAINT CK_MaxParticipants CHECK (MaxParticipants >= 0);

-- Ràng buộc kiểm tra trạng thái đăng ký chỉ nhận các giá trị đã định nghĩa
ALTER TABLE ActivitySession
ADD CONSTRAINT CK_RegistrationStatus CHECK (RegistrationStatus IN (0, 1, -1));

-- Ràng buộc kiểm tra thời gian bắt đầu đăng ký không vượt quá thời gian kết thúc đăng ký
ALTER TABLE ActivitySession
ADD CONSTRAINT CK_RegistrationTimeRange CHECK (RegistrationStartTime <= RegistrationEndTime);

-- Ràng buộc kiểm tra thời gian bắt đầu và kết thúc đăng ký không sau thời gian hiện tại
ALTER TABLE ActivitySession
ADD CONSTRAINT CK_RegistrationTime CHECK (RegistrationStartTime <= CURRENT_TIMESTAMP AND RegistrationEndTime <= CURRENT_TIMESTAMP);

---------------- Bảng ActivityParticipation ---------------
CREATE TABLE ActivityParticipation (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    ActivitySessionID INT,
    StudentID INT,
	RegistrationStatus INT DEFAULT 1 CHECK (RegistrationStatus IN (1, -1)),
	AttendanceStatus INT DEFAULT 0 CHECK (AttendanceStatus IN (0, 1, -1)),
	ApprovalAttendanceStatus INT DEFAULT 0 CHECK (ApprovalAttendanceStatus IN (0, 1, -1)),
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng AttendanceComplaint ---------------
CREATE TABLE AttendanceComplaint (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    ActivityParticipationID INT,
    EvidenceURL VARCHAR(255),
    RequestStatus INT DEFAULT 1 CHECK (RequestStatus IN (1, -1)),
    ApprovalStatus INT DEFAULT 0 CHECK (ApprovalStatus IN (0, 1, -1)),
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng NotificationType ---------------
CREATE TABLE NotificationType (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) UNIQUE,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng Notification ---------------
CREATE TABLE Notification (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255),
    Content NVARCHAR(1000),
    TypeID INT,
    SentTo INT,       
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng ActionType ---------------
CREATE TABLE ActionType (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) UNIQUE,
	Status INT DEFAULT 0 CHECK (Status IN (0, 1, -1)),
	Description NVARCHAR(255)
);

---------------- Bảng RecordHistory ---------------
CREATE TABLE RecordHistory (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    TableName VARCHAR(255) NOT NULL,
    RecordID INT,
    ActionTypeID INT,
    ActorID INT,
    ActionTime DATETIME,
    Description NVARCHAR(MAX),
    DeviceUsed NVARCHAR(255),
    Location NVARCHAR(255)
);

----------------- 2. THÊM KHÓA NGOẠI ------------------
GO
---------------- Bảng Users ---------------
ALTER TABLE Users
ADD CONSTRAINT FK_UserRoleID FOREIGN KEY (RoleID) REFERENCES Roles(ID);

ALTER TABLE Users
ADD CONSTRAINT FK_UserFacultyID FOREIGN KEY (FacultyID) REFERENCES Faculty(ID);

ALTER TABLE Users
ADD CONSTRAINT FK_UserClassID FOREIGN KEY (ClassID) REFERENCES Class(ID);

---------------- Bảng RolePermission ----------------
ALTER TABLE RolePermission
ADD CONSTRAINT FK_RolePermissionRoleID FOREIGN KEY (RoleID) REFERENCES Roles(ID);

ALTER TABLE RolePermission
ADD CONSTRAINT FK_RolePermissionPermissionID FOREIGN KEY (PermissionID) REFERENCES Permission(ID);

---------------- Bảng Class ---------------
--ALTER TABLE Class
--ADD CONSTRAINT FK_ClassAdvisorID FOREIGN KEY (AdvisorID) REFERENCES Users(ID);

ALTER TABLE Class
ADD CONSTRAINT FK_ClassFacultyID FOREIGN KEY (FacultyID) REFERENCES Faculty(ID);

---------------- Bảng ActivityCategory ---------------
ALTER TABLE ActivityCategory
ADD CONSTRAINT FK_ActivityCategoryFacultyID FOREIGN KEY (FacultyID) REFERENCES Faculty(ID);

---------------- Bảng Activity ---------------
ALTER TABLE Activity
ADD CONSTRAINT FK_ActivityAcademicYearID FOREIGN KEY (AcademicYearID) REFERENCES AcademicYear(ID);

ALTER TABLE Activity
ADD CONSTRAINT FK_ActivityActivityCategoryID FOREIGN KEY (ActivityCategoryID) REFERENCES ActivityCategory(ID);

---------------- Bảng ActivitySession ---------------
ALTER TABLE ActivitySession
ADD CONSTRAINT FK_ActivitySessionActivityID FOREIGN KEY (ActivityID) REFERENCES Activity(ID);

---------------- Bảng ActivityParticipation ---------------
ALTER TABLE ActivityParticipation
ADD CONSTRAINT FK_ActivityParticipation_Student
    FOREIGN KEY (StudentID) REFERENCES Users(ID);

ALTER TABLE ActivityParticipation
ADD CONSTRAINT FK_ActivityParticipation_ActivitySession
    FOREIGN KEY (ActivitySessionID) REFERENCES ActivitySession(ID);

---------------- Bảng AttendanceComplaint ---------------
ALTER TABLE AttendanceComplaint
ADD CONSTRAINT FK_AttendanceComplaint_ActivityParticipation
    FOREIGN KEY (ActivityParticipationID) REFERENCES ActivityParticipation(ID);

---------------- Bảng Notification ---------------
ALTER TABLE Notification
ADD CONSTRAINT FK_NotificationSentTo FOREIGN KEY (SentTo) REFERENCES Users(ID);

ALTER TABLE Notification
ADD CONSTRAINT FK_NotificationTypeID FOREIGN KEY (TypeID) REFERENCES NotificationType(ID);

---------------- Bảng RecordHistory ---------------
ALTER TABLE RecordHistory
ADD CONSTRAINT FK_RecordHistory_ActorID
    FOREIGN KEY (ActorID) REFERENCES Users(ID);

ALTER TABLE RecordHistory
ADD CONSTRAINT FK_RecordHistory_ActionType
    FOREIGN KEY (ActionTypeID) REFERENCES ActionType(ID);

-- Sử dụng database
GO
USE SocialWorkDB
GO





