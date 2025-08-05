import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FileText, Code, FileJson, X } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const exportOptions = [
    { icon: FileText, label: 'PDF' },
    { icon: Code, label: 'TXT' },
    { icon: FileJson, label: 'JSON' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className={`p-6 rounded-2xl shadow-2xl w-full max-w-sm mx-4 ${isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('export.title')}</h2>
          <button onClick={onClose} className={`p-1 rounded-full ${isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}>
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {exportOptions.map((option, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <option.icon size={32} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              <span className={`mt-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportModal;