import React from 'react';
import { animated } from '@react-spring/web';
import NavLink from './NavLink';

const Menu = ({ menuSpring, selected, onSelect }) => {
  return (
    <animated.div style={menuSpring} className="flex">
      <div className="relative flex space-x-2 md:space-x-4 text-sm md:text-base bg-white/10 backdrop-blur-lg rounded-xl p-2">
        <NavLink to="/products" selected={selected} onSelect={onSelect}>
          PRODUCTS
        </NavLink>
        <NavLink to="/" selected={selected} onSelect={onSelect}>
          OVERSEE
        </NavLink>
        <NavLink to="/orders" selected={selected} onSelect={onSelect}>
          ORDERS
        </NavLink>
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-blue-400 transition-all duration-300"
          style={{
            width: '33.33%',
            transform: `translateX(${
              selected === '/products' ? '0%' : 
              selected === '/' ? '100%' : 
              '200%'
            })`
          }}
        />
      </div>
    </animated.div>
  );
};

export default Menu;