import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    sessionStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};