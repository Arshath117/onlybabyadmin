import React, { useState } from "react";
import { useSpring, animated } from '@react-spring/web';
import { Upload, X } from 'lucide-react';
import { FormInput } from './FormInput';
import { FormTextArea } from './FormTextArea';
import axios from 'axios';

const AddProductForm = ({ onClose, onProductAdded }) => {
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
    image: []
  });

  const formSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 300, friction: 20 }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, image: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://onlybaby-admin.onrender.com/api/products/add",
        formData
      );
      onProductAdded();
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <animated.div style={formSpring} className="p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Add New Product</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <FormInput
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
          <FormInput
            label="Age Group"
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleInputChange}
          />
          <FormInput
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
          <FormTextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <FormInput
            label="Items Included"
            name="itemsIncluded"
            value={formData.itemsIncluded}
            onChange={handleInputChange}
          />
          <FormInput
            label="Features"
            name="features"
            value={formData.features}
            onChange={handleInputChange}
          />
          <FormInput
            label="Benefits"
            name="benefits"
            value={formData.benefits}
            onChange={handleInputChange}
          />
          <FormInput
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload files</span>
                    <input
                      type="file"
                      multiple
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Product
          </button>
        </div>
      </form>
    </animated.div>
  );
};

export default AddProductForm;