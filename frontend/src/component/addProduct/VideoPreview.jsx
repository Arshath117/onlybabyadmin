import React from 'react';
import { X } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

const VideoPreview = ({ videoSrc, onRemove, className = "" }) => {
  // Define the spring animation within the component
  const springProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.div 
      style={springProps}
      className={`relative inline-block mt-2 ${className}`}
    >
      <video
        controls
        className="max-w-xs rounded-lg shadow-md"
        src={videoSrc}
      />
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors focus:outline-none"
        title="Remove video"
      >
        <X className="w-4 h-4" />
      </button>
    </animated.div>
  );
};

export default VideoPreview;