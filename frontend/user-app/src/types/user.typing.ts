export interface IUser {
  id: number;
  email: string;
  password: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: string | null;
  address?: string;
  phoneNumber?: string | null;
  roleId?: number | null;
  facultyId?: number | null;
  classId?: number | null;
  status?: number | null;
  description?: string | null;
}

export interface IUserDetail {
  id: number;
  email: string;
  fullName: string;
  dateOfBirth?: Date;
  gender?: string | null;
  address: string;
  phoneNumber?: string | null;
  roleName?: string | null;
  facultyName?: string | null;
  className?: string | null;
  status?: number | null;
  description?: string | null;
}

export interface ICreateUser {
  email?: string;
  password?: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: string | null;
  address?: string;
  phoneNumber?: string | null;
  roleId?: number | null;
  facultyId?: number | null;
  classId?: number | null;
  status?: number | null;
  description?: string | null;
}
