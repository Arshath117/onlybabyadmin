import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, ShoppingBag } from 'lucide-react';
import NavLink from './NavLink';
import { useSpring, animated } from '@react-spring/web';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(location.pathname);

  const logoSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 300, friction: 20 }
  });

  const menuSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
    config: { tension: 300, friction: 20 }
  });

  const handleSelect = (path) => {
    setSelected(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 w-full md:px-10 px-3 py-5 flex justify-between items-center bg-blue-950 text-white z-50 shadow-lg">
      <animated.div style={logoSpring} className="font-logo text-xl md:text-2xl lg:text-4xl font-bold flex items-center gap-2">
        <ShoppingBag className="w-8 h-8" />
        <span>OnlyBaby</span>
      </animated.div>

      <animated.div 
        style={menuSpring}
        className="flex space-x-3 text-[9px] md:text-[14px] border-2 border-blue-200 py-1 px-2 rounded-xl backdrop-blur-sm bg-blue-900/50"
      >
        <NavLink to="/products" selected={selected} onSelect={handleSelect}>
          PRODUCTS
        </NavLink>
        <NavLink to="/" selected={selected} onSelect={handleSelect}>
          OVERSEE
        </NavLink>
        <NavLink to="/orders" selected={selected} onSelect={handleSelect}>
          ORDERS
        </NavLink>
      </animated.div>

      <animated.div 
        style={logoSpring}
        className="flex items-center gap-2"
      >
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-800"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </animated.div>
    </div>
  );
};

export default Nav;