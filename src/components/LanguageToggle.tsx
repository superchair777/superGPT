import React, { useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'th' as const, name: 'ไทย', flag: '🇹🇭' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: 'en' | 'th') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
          ${isDark 
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900'
          }
        `}
        title="Change language"
      >
        <Languages size={16} />
        <span className="text-sm font-medium">{currentLanguage?.flag}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={`
            absolute top-full mt-2 right-0 rounded-lg shadow-lg min-w-[140px] z-20
            ${isDark 
              ? 'bg-gray-700 border border-gray-600' 
              : 'bg-white border border-gray-200'
            }
          `}>
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-left transition-colors text-sm
                    ${language === lang.code 
                      ? isDark 
                        ? 'bg-gray-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                      : isDark
                        ? 'text-gray-300 hover:bg-gray-600 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;