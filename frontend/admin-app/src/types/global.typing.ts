export interface MenuItemType {
  label: string;
  link: string;
  subItems?: MenuItemType[];
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  responseData: T;
  timeStamp: string;
}

export interface IRole {
  id: number;
  name: string;
  status?: number;
  description?: string;
}

export interface ICreateRole {
  name: string;
  status?: number;
  description?: string;
}

export interface IPermission {
  id: number;
  name: string;
  status?: number;
  description?: string;
}

export interface ICreatePermission {
  name: string;
  status?: number;
  description?: string;
}

export interface IRolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  status?: number;
  description?: string;
}

export interface ICreateRolePermission {
  roleId: number;
  permissionId: number;
  status?: number;
  description?: string;
}

export interface IActionType {
  id: number;
  name: string;
  status?: number;
  description?: string;
}

export interface ICreateActionType {
  name: string;
  status?: number;
  description?: string;
}

export interface IRecordHistory {
  id: number;
  tableName: string;
  recordId?: number;
  actionTypeId?: number;
  actorId?: number;
  actionTime?: Date;
  description?: string;
  deviceUsed?: string;
  location?: string;
}

export interface ICreateRecordHistory {
  tableName: string;
  recordId?: number;
  actionTypeId?: number;
  actorId?: number;
  actionTime?: Date;
  description?: string;
  deviceUsed?: string;
  location?: string;
}

export interface IAcademicYear {
  id: number;
  name: string;
  starttime?: Date;
  endtime?: Date;
  status?: number;
  description?: string;
}

export interface ICreateAcademicYear {
  name: string;
  starttime?: Date;
  endtime?: Date;
  status?: number;
  description?: string;
}

export interface IFaculty {
  id: number;
  name: string;
  status?: number;
  description?: string;
}

export interface ICreateFaculty {
  name: string;
  status?: number;
  description?: string;
}

export interface IClass {
  id: number;
  name: string;
  advisorId?: number;
  facultyId?: number;
  status?: number;
  description?: string;
}

export interface ICreateClass {
  name: string;
  advisorId?: number;
  facultyId?: number;
  status?: number;
  description?: string;
}

export interface IActivityCategory {
  id: number;
  name: string;
  facultyId?: number;
  status?: number;
  description?: string;
  parentCategoryId?: number;
}

export interface ICreateActivityCategory {
  name: string;
  facultyId?: number;
  status?: number;
  description?: string;
  parentCategoryId?: number;
}

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

export interface ICreateActivityParticipation {
  activitySessionId?: number;
  studentId?: number;
  registrationStatus?: number;
  attendanceStatus?: number;
  approvalAttendanceStatus?: number;
  status?: number;
  description?: string;
}

export interface IAttendanceComplaint {
  id: number;
  activityParticipationId?: number;
  evidenceUrl?: string;
  requestStatus?: number;
  approvalStatus?: number;
  status?: number;
  description?: string;
}

export interface ICreateAttendanceComplaint {
  activityParticipationId?: number;
  evidenceUrl?: string;
  requestStatus?: number;
  approvalStatus?: number;
  status?: number;
  description?: string;
}

export interface INotificationType {
  id: number;
  name: string;
  status?: number;
  description?: string;
}

export interface ICreateNotificationType {
  name: string;
  status?: number;
  description?: string;
}

export interface INotification {
  id: number;
  title?: string;
  content?: string;
  typeId?: number;
  sentTo?: number;
  status?: number;
  description?: string;
}

export interface ICreateNotification {
  title?: string;
  content?: string;
  typeId?: number;
  sentTo?: number;
  status?: number;
  description?: string;
}
