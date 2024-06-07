export interface IActivitySession {
  id: number;
  activityId?: number;
  activityDate?: Date;
  session?: string;
  startTime?: Date;
  endTime?: Date;
  daysCount?: number;
  maxParticipants?: number;
  registrationStartTime?: Date;
  registrationEndTime?: Date;
  registrationAcceptanceStatus?: number;
  status?: number;
  description?: string;
}

export interface IActivitySessionDetail {
  id: number;
  activityId?: number;
  activityName?: string;
  activityDate?: Date;
  session?: string;
  startTime?: Date;
  endTime?: Date;
  daysCount?: number;
  maxParticipants?: number;
  registrationStartTime?: Date;
  registrationEndTime?: Date;
  registrationAcceptanceStatusText?: string;
  statusText?: string;
  description?: string;
}

export interface ICreateActivitySession {
  activityId?: number;
  activityDate?: Date;
  session?: string;
  startTime?: Date;
  endTime?: Date;
  daysCount?: number;
  maxParticipants?: number;
  registrationStartTime?: Date;
  registrationEndTime?: Date;
  registrationAcceptanceStatus?: number;
  status?: number;
  description?: string;
}
