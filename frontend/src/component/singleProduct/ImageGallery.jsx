import React from 'react';
import { animated } from '@react-spring/web';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ imageSpring, mediaItems, currentIndex, onNext, onPrev }) => {
  if (!mediaItems || mediaItems.length === 0) {
    return <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-semibold rounded-lg shadow-md">No media available</div>;
  }

  const currentMedia = mediaItems[currentIndex];
  const isVideo = currentMedia && currentMedia.includes('video');

  return (
    <div className="relative w-full h-64 md:h-96 flex items-center justify-center bg-black/10 rounded-lg shadow-lg overflow-hidden">
      <animated.div style={{ ...imageSpring }} className="w-full h-full transition-all duration-500">
        {isVideo ? (
          <video
            src={currentMedia}
            className="w-full h-full object-contain rounded-lg"
            controls
            autoPlay
          />
        ) : (
          <img
            src={currentMedia}
            alt={`Gallery item ${currentIndex}`}
            className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-105"
          />
        )}
      </animated.div>
      {mediaItems.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 text-white p-3 rounded-full transition duration-200 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 text-white p-3 rounded-full transition duration-200 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
