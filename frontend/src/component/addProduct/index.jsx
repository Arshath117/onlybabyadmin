import React, { useState } from "react";
import { X } from 'lucide-react';
import { useSpring, animated, config } from '@react-spring/web';
import FormField from './FormField';
import ImagePreview from './ImagePreview';
import axios from 'axios';

const AddProduct = ({ onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ageGroup: "",
    color: "",
    description: "",
    itemsIncluded: "",
    features: "",
    benefits: "",
    quantity: "",
    image: [],
  });

  // Animations
  const modalSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.gentle
  });

  const formFieldsSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
    config: config.gentle
  });

  const imageSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 400,
    config: config.gentle
  });

  const buttonSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 600,
    config: config.gentle
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...imageUrls]
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://onlybaby-admin.onrender.com/api/products/add",
        formData,
        {
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
          },
        }
      );
      onProductAdded();
      onClose();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <animated.div 
        style={modalSpring}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4"
      >
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New Product
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              spring={formFieldsSpring}
            />
            <FormField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              spring={formFieldsSpring}
            />
            <FormField
              label="Age Group"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleInputChange}
              spring={formFieldsSpring}
            />
            <FormField
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              spring={formFieldsSpring}
            />
            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleInputChange}
              spring={formFieldsSpring}
              className="md:col-span-2"
            />
            <FormField
              label="Items Included"
              name="itemsIncluded"
              value={formData.itemsIncluded}
              onChange={handleInputChange}
              spring={formFieldsSpring}
            />
            <FormField
              label="Features"
              name="features"
              type="textarea"
              value={formData.features}
              onChange={handleInputChange}
              spring={formFieldsSpring}
            />
            <FormField
              label="Benefits"
              name="benefits"
              type="textarea"
              value={formData.benefits}
              onChange={handleInputChange}
              spring={formFieldsSpring}
            />
            <FormField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              spring={formFieldsSpring}
            />
          </div>

          {/* Image Upload Field */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <ImagePreview 
            images={formData.image}
            onRemove={handleRemoveImage}
            imageSpring={imageSpring}
          />

          <animated.div style={buttonSpring} className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              Save Product
            </button>
          </animated.div>
        </div>
      </animated.div>
    </div>
  );
};

export default AddProduct;
