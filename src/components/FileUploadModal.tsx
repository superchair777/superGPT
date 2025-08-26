import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { UploadCloud, Image, File } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className={`p-6 rounded-2xl shadow-2xl w-full max-w-lg mx-4 ${isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 text-center transition-colors ${isDark ? 'border-gray-600 hover:border-gray-500 bg-[#212121]' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}">
          <UploadCloud size={48} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          <p className={`mt-4 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('fileUpload.title')}</p>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('fileUpload.subtitle')}</p>
          <button className="mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            {t('fileUpload.button')}
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <Image size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('fileUpload.photo')} </span>
          </div>
          <div className="flex items-center gap-2">
            <File size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('fileUpload.file')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;