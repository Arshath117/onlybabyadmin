import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { animated } from '@react-spring/web';

const Logo = ({ logoSpring, glowSpring }) => {
  return (
    <animated.div 
      style={{...logoSpring, ...glowSpring}}
      className="font-logo text-xl md:text-3xl lg:text-4xl font-bold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white"
    >
      <ShoppingBag className="w-8 h-8 text-blue-200" />
      <span className="hidden md:block">OnlyBaby</span>
    </animated.div>
  );
};

export default Logo;