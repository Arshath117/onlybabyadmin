import React from 'react';
import { LogOut } from 'lucide-react';
import { animated } from '@react-spring/web';

const LogoutButton = ({ logoutSpring, onLogout, onMouseEnter, onMouseLeave }) => {
  return (
    <animated.button
      style={logoutSpring}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onLogout}
      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-300"
    >
      <LogOut size={18} className="text-red-300" />
      <span className="hidden md:block text-red-300">Logout</span>
    </animated.button>
  );
};

export default LogoutButton;