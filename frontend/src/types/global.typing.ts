export interface IActivity {
  id: number;
  name: string;
  location?: string;
  releaseTime?: string;
  status?: number;
  description?: string;
}

export interface ICreateActivity {
  name: string;
  location?: string;
  releaseTime?: string;
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
