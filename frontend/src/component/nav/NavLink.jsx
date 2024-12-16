import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, selected, onSelect, children }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
      selected === to ? "bg-white text-blue-950" : "hover:bg-blue-800"
    }`}
    onClick={() => onSelect(to)}
  >
    {children}
  </Link>
);

export default NavLink;