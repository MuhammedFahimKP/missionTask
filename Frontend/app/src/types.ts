export interface Post {
  id: number;
  useId: number;
  title: string;
  body: string;
}

export type Department = "ADMIN" | "IT" | "MARKETING" | "HR";

export interface User {
  name: string;
  email: string;
  dept: Department;
}

export interface ListUsers extends User {
  id: number;
}

export interface LoginResponse extends User {
  access: string;
  refresh: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[] | [];
}

export interface DepartmentResponse {
  name: string;
}

export interface EmployeeCreateRequest extends LoginRequest {
  name: string;
  dept: string;
}
