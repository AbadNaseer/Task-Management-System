import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { User } from '../types';

interface DecodedToken {
  userId: string;
  name: string;
  email: string;
  exp: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser({
            id: decoded.userId,
            name: decoded.name,
            email: decoded.email,
          });
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, login, logout };
};

export default useAuth; 