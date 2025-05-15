import React from 'react';
import { ConfirmationDialog } from '../../shared/components/ui';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Personal Voice"
    >
      <div className="py-2">
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete your Personal Voice?
        </p>
        
        <div className="flex gap-4 justify-end">
          <button 
            onClick={onConfirm}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            DELETE
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
          >
            NO, KEEP IT
          </button>
        </div>
      </div>
    </ConfirmationDialog>
  );
}; 