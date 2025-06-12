export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
} 