import React from 'react';
import { animated } from '@react-spring/web';
import EditableField from './EditableField';

const ProductDetails = ({ fadeIn, product, isEditing, editedProduct, onFieldChange }) => {
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
        {["ageGroup", "description", "features", "benefits", "color"].map((field) => (
          <div key={field} className="pt-6 first:pt-0">
            <h3 className="text-lg font-semibold capitalize mb-2">
              {field.replace(/([A-Z])/g, " $1").trim()}:
            </h3>
            <EditableField
              isEditing={isEditing}
              value={isEditing ? editedProduct[field] : product[field]}
              onChange={(value) => onFieldChange(field, value)}
              type="textarea"
              className="text-gray-700 leading-relaxed"
            />
          </div>
        ))}
      </div>
    </animated.div>
  );
};

export default ProductDetails;