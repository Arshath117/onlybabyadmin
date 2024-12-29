import React from 'react';
import Nav from '../nav/Nav';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isOTPPage = location.pathname === '/otp';
  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && !isOTPPage && <Nav />}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;