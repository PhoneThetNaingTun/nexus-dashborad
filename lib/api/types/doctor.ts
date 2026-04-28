import { DoctorType } from "./doctor-type";
import { User } from "./user";

export interface Doctor {
  id: string;
  user: User;
  type_id: string;
  user_id: string;
  type: DoctorType;
  bio?: string;
  fee: number;
  createdAt: string;
  updatedAt: string;
}
