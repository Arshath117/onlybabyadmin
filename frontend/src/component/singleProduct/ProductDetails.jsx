import React, { useState, useRef } from 'react';
import { animated } from '@react-spring/web';
import EditableField from './EditableField';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

const ProductDetails = ({ fadeIn, product, isEditing, editedProduct, onFieldChange, onColorSelect, onRemoveColor, onRemoveImage, onAddImage, onAddVideo }) => {
  const [newImageFiles, setNewImageFiles] = useState({});
  const [newVideoFile, setNewVideoFile] = useState({});
  const [newColor, setNewColor] = useState('');
  const fileInputRefs = useRef({});

  const handleImageChange = (color, e) => {
    const files = Array.from(e.target.files);
    console.log(`Adding images for ${color}:`, files);
    const currentImages = editedProduct.colors.find(c => c.color === color)?.images.length || 0;
    const remainingSlots = 5 - currentImages;

    if (files.length <= remainingSlots) {
      setNewImageFiles(prev => ({ ...prev, [color]: files }));
      onAddImage(color, files);
      if (fileInputRefs.current[color]) {
        fileInputRefs.current[color].value = '';
      }
    } else {
      toast.warning(`You can only add ${remainingSlots} more images for ${color}. Maximum limit is 5 images.`);
    }
  };

  const handleVideoChange = (color, e) => {
    const file = e.target.files[0];
    console.log(`Adding video for ${color}:`, file);
    const hasVideo = editedProduct.colors.find(c => c.color === color)?.video;
    if (!hasVideo) {
      setNewVideoFile(prev => ({ ...prev, [color]: file }));
      onAddVideo(color, file);
    } else {
      toast.warning(`Only one video is allowed per color. Remove the existing one first.`);
    }
  };

  const handleAddColor = () => {
    if (!newColor) {
      toast.warning("Please enter a color name.");
      return;
    }
    if (editedProduct.colors.some(c => c.color === newColor)) {
      toast.warning("This color already exists.");
      return;
    }
    onFieldChange('colors', [...editedProduct.colors, { color: newColor, images: [], video: null }]);
    setNewColor('');
  };

  return (
    <animated.div style={fadeIn} className="mt-8 lg:mt-0 space-y-6">
      <div className="space-y-4">
        <EditableField
          isEditing={isEditing}
          value={isEditing ? editedProduct.name : product.name}
          onChange={(value) => onFieldChange("name", value)}
          type="text"
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        />
        <EditableField
          isEditing={isEditing}
          value={isEditing ? editedProduct.price : `₹${product.price}`}
          onChange={(value) => onFieldChange("price", value)}
          type="number"
          className="text-2xl md:text-4xl font-bold text-green-500"
        />
      </div>

      <div className="space-y-6 divide-y divide-gray-200">
      <div className="pt-6">
          <h3 className="text-lg font-semibold capitalize mb-2">Colors:</h3>
          {isEditing ? (
            <div className="space-y-4">
              {editedProduct.colors.map((c) => (
                <div key={c.color} className="border p-4 rounded-md relative">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{c.color}</span>
                    <button onClick={() => onRemoveColor(c.color)} className="text-red-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {c.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img} alt={`${c.color} ${index}`} className="w-20 h-20 object-cover rounded" />
                        <button
                          onClick={() => onRemoveImage(c.color, index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {c.video && (
                      <div className="relative">
                        <video src={c.video} className="w-20 h-20 object-cover rounded" controls />
                        <button
                          onClick={() => onRemoveImage(c.color, 'video')}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {c.images.length} images (max 5, {5 - c.images.length} slots remaining)
                    </p>
                    <div className='flex flex-col gap-2'>
                      <div>
                      <span className='mr-2 font-sans text-gray-500 font-semibold'>Image Input</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={el => (fileInputRefs.current[c.color] = el)}
                        onChange={(e) => handleImageChange(c.color, e)}
                        disabled={c.images.length >= 5}
                        className="mt-2"
                      />
                      </div>
                      <div>
                      <span className='mr-2 font-sans text-gray-500 font-semibold'>Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleVideoChange(c.color, e)}
                        disabled={!!c.video}
                        className="mt-2"
                      />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border p-4 rounded-md">
                <h4 className="text-md font-semibold mb-2">Add New Color</h4>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Color Name</label>
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="e.g., Blue"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Color
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {product.colors.map((c) => (
                <div
                  key={c.color}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => onColorSelect(c.color)}
                >
                  <div
                    style={{ backgroundColor: c.color }}
                    className="h-6 w-6 rounded-full border border-gray-300"
                  />
                  <span className="text-gray-700">{c.color}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {["ageGroup", "description", "itemsIncluded", "features", "benefits", "quantity", "discount"].map((field) => (
          <div key={field} className="pt-6 first:pt-0">
            <h3 className="text-lg font-semibold capitalize mb-2">
              {field.replace(/([A-Z])/g, " $1").trim()}:
            </h3>
            <EditableField
              isEditing={isEditing}
              value={isEditing ? editedProduct[field] : product[field]}
              onChange={(value) => onFieldChange(field, value)}
              type={field === "quantity" || field === "discount" ? "number" : "textarea"}
              className="text-gray-700 leading-relaxed"
            />
          </div>
        ))}
       
      </div>
    </animated.div>
  );
};

export default ProductDetails;