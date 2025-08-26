import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Image, Lightbulb, Search, Globe, PenTool } from 'lucide-react';

interface ToolsDropdownProps {
  isOpen: boolean;
}

const ToolsDropdown: React.FC<ToolsDropdownProps> = ({ isOpen }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const toolOptions = [
    { icon: BookOpen, label: t('tools.studyAndLearn') },
    { icon: Image, label: t('tools.createImage') },
    { icon: Lightbulb, label: t('tools.thinkLonger') },
    { icon: Search, label: t('tools.deepResearch') },
    { icon: Globe, label: t('tools.webSearch') },
    { icon: PenTool, label: t('tools.canvas') },
  ];

  if (!isOpen) return null;

  return (
    <div className={`
      absolute bottom-full mb-2 left-0 w-56 rounded-xl shadow-lg z-20
      ${isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border border-gray-200'}
    `}>
      <div className="py-2">
        {toolOptions.map((option, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${
              isDark 
                ? 'text-gray-300 hover:text-white hover:bg-[#3f3f3f]' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <option.icon size={18} />
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolsDropdown;