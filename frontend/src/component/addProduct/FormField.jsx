import React from 'react';
import { animated } from '@react-spring/web';

const FormField = ({ label, name, type = 'text', value, onChange, spring, options = [], className = '' }) => {
  const isTextArea = type === 'textarea';
  const isSelect = type === 'select';
  const Component = isTextArea ? 'textarea' : isSelect ? 'select' : 'input';

  return (
    <animated.div style={spring} className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${className}`}
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <Component
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
            isTextArea ? 'min-h-[100px] resize-none' : ''
          } ${className}`}
        />
      )}
    </animated.div>
  );
};

export default FormField;
