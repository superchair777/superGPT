import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleteType?: 'chat' | 'images';
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, deleteType = 'chat' }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className={`p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4 ${isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {deleteType === 'images' ? t('delete.imagesTitle') : t('delete.title')}
          </h2>
          <button onClick={onClose} className={`p-1 rounded-full ${isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}>
            <X size={20} />
          </button>
        </div>
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {deleteType === 'images' ? t('delete.imagesMessage') : t('delete.message')}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            {t('delete.cancelButton')}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            {t('delete.deleteButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;