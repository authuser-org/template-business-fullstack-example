// Roles de usuario compartidos entre web, api y mobile
export enum UserRole {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

// Entidad de usuario base (sin campos sensibles)
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

// DTO de creación — usado en forms (web/mobile) y endpoints (api)
export interface CreateUserDto {
  email: string;
  name: string;
  role?: UserRole;
}

// Respuesta paginada genérica — útil en api y para tipar fetches en web/mobile
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
