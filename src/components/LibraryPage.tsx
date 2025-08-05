import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Plus, SlidersHorizontal, Mic, Send, Download } from 'lucide-react';
import Header from './Header';

const LibraryPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const images = [
    '/placeholder1.svg',
    '/placeholder2.svg',
    '/placeholder3.svg',
    '/placeholder4.svg',
  ];

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header />
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div key={index} className="group relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img src={src} alt={`Library item ${index + 1}`} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <a
                  href={src}
                  download={`superchair-logo-${index + 1}.svg`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black rounded-full p-3"
                >
                  <Download size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="w-full max-w-3xl mx-auto">
          <div className={`relative flex items-center rounded-full border-2 ${isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
            <button className={`flex items-center gap-2 p-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Plus size={18} />
              <SlidersHorizontal size={18} />
            </button>
            <input
              type="text"
              placeholder={t('library.describe')}
              className={`flex-1 w-full bg-transparent py-3.5 resize-none outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}
            />
            <div className="flex items-center gap-2 pr-3">
              <button className={`p-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Mic size={20} />
              </button>
              <button className={`p-2 rounded-full ${isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;