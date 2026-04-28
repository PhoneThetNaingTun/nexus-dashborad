export const Roles = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  role: Role;
}
