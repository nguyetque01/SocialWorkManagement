export interface IActivity {
  id: number;
  name: string;
  location?: string | null;
  academicYearId?: number | null;
  activityCategoryId?: number | null;
  releaseTime?: Date | null;
  status?: number | null;
  description?: string | null;
}

export interface IActivityDetail {
  id: number;
  name: string;
  location?: string | null;
  academicYear?: string | null;
  activityCategory?: string | null;
  releaseTime?: Date | null;
  statusText?: string | null;
  description?: string | null;
}

export interface ICreateActivity {
  name: string;
  location?: string | null;
  academicYearId?: number | null;
  activityCategoryId?: number | null;
  releaseTime?: Date | null;
  status?: number | null;
  description?: string | null;
}
