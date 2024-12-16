import React from 'react';

const EditableField = ({ isEditing, value, onChange, type, className }) => {
  if (!isEditing) {
    return <p className={className}>{value}</p>;
  }

  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 min-h-[100px]"
      />
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
    />
  );
};

export default EditableField;