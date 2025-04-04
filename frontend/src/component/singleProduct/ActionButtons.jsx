import React from 'react';
import { Save, Edit, X, ChevronLeft } from 'lucide-react';
import { animated } from '@react-spring/web';

const ActionButtons = ({ isEditing, buttonSpring, onBack, onEdit, onSave, onCancel, isSaving, isCancelling }) => {
  const isDisabled = isSaving || isCancelling;

  return (
    <div className="sticky top-[80px] md:top-[89px] z-10 bg-white/90 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center">
      <animated.button
        style={buttonSpring}
        onClick={onBack}
        className="flex items-center gap-2 text-xl text-blue-600 hover:text-blue-700 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
        <span>Back</span>
      </animated.button>
      
      {isEditing ? (
        <div className="flex gap-4">
          <animated.button
            style={buttonSpring}
            onClick={onSave}
            disabled={isDisabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDisabled
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            <Save className="w-5 h-5" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </animated.button>
          <animated.button
            style={buttonSpring}
            onClick={onCancel}
            disabled={isDisabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDisabled
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            <X className="w-5 h-5" />
            <span>{isCancelling ? 'Cancelling...' : 'Cancel'}</span>
          </animated.button>
        </div>
      ) : (
        <animated.button
          style={buttonSpring}
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Edit className="w-5 h-5" />
          <span>Edit</span>
        </animated.button>
      )}
    </div>
  );
};

export default ActionButtons;