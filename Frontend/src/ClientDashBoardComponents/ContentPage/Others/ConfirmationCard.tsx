import React from 'react';

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed  inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 backdrop-blur-lg  bg-opacity-30"></div> {/* Blurred background */}
      <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg max-w-sm w-full relative">
        <h2 className="text-lg font-semibold mb-4">Confirm Registration</h2>
        <p>Are you sure you want to save the information?</p>
        <div className="flex justify-center gap-4 mt-6"> {/* Center the buttons and give space between them */}
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
