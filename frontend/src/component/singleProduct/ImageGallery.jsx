import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { animated } from '@react-spring/web';

const ImageGallery = ({ imageSpring, currentImage, onNext, onPrev }) => {
  return (
    <animated.div style={imageSpring} className="relative w-full h-auto group">
      <img
        src={currentImage}
        alt="Product"
        className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </animated.div>
  );
};

export default ImageGallery;