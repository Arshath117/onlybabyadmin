import React from 'react';
import { X } from 'lucide-react';
import { animated } from '@react-spring/web';

const ImagePreview = ({ images, onRemove, imageSpring }) => {
  return (
    <animated.div style={imageSpring} className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={image}
            alt={`Preview ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </animated.div>
  );
};

export default ImagePreview;