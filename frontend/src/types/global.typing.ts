export interface IActivity {
  id: string;
  name: string;
  location: string;
  releaseTime: string;
  status: string;
  description: string;
}

export interface ICreateActivity {
  name: string;
  location: string;
  releaseTime: string;
  description: string;
}

export interface IActionType {
  id: number;
  name: string;
  status: number;
  description: string;
}

export interface ICreateActionType {
  name: string;
  status: number;
  description: string;
}
