import { Task } from '../types';

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getStatusColor = (status: Task['status']): string => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in_progress':
      return 'warning';
    default:
      return 'error';
  }
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}; 