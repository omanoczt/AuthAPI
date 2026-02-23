export interface Application {
  id: string;
  name: string;
  active: boolean;
}

export default interface UserData {
  id: string;
  username: string;
  password: string;
  deleted: boolean;
  createdAt: number;
  updatedAt: number;
}