export interface IActivityParticipation {
  id: number;
  activitySessionId?: number;
  studentId?: number;
  registrationStatus?: number;
  attendanceStatus?: number;
  approvalAttendanceStatus?: number;
  status?: number;
  description?: string;
}

export interface IActivityParticipationDetail {
  id: number;
  studentId?: number;
  studentName?: string;
  activityId?: number;
  activityName?: string;
  activitySessionId?: number;
  session?: string;
  startTime?: Date;
  endTime?: Date;
  daysCount?: number;
  statusText?: string;
  registrationStatusText?: string;
  attendanceStatusText?: string;
  approvalAttendanceStatusText?: string;
  description?: string;
}

export interface ICreateActivityParticipation {
  activitySessionId?: number;
  studentId?: number;
  registrationStatus?: number;
  attendanceStatus?: number;
  approvalAttendanceStatus?: number;
  status?: number;
  description?: string;
}
