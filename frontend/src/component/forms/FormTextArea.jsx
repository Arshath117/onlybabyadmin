import React from 'react';

export const FormTextArea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
    />
  </div>
);