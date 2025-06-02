// ImagePreview.jsx
import React from 'react';
import { X } from 'lucide-react'; // Assuming you use lucide-react for the X icon

const ImagePreview = ({ imageUrl, onRemove }) => {
  return (
    <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md group">
      <img src={imageUrl} alt="Product" className="w-full h-full object-cover" />
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ImagePreview;