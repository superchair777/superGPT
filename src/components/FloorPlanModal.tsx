import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X } from 'lucide-react';

interface FloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloorPlanModal: React.FC<FloorPlanModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-lg p-8 w-full max-w-md ${isDark ? 'bg-[#2f2f2f] text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{t('floorPlan.generate')}</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className={`text-md font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('floorPlan.dimensions')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="width" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.width')}</label>
                <input type="number" id="width" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
              <div>
                <label htmlFor="height" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.height')}</label>
                <input type="number" id="height" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
            </div>
          </div>
          <div>
            <h3 className={`text-md font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('floorPlan.elements')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="chairs" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.chairs')}</label>
                <input type="number" id="chairs" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
              <div>
                <label htmlFor="tables" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.tables')}</label>
                <input type="number" id="tables" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
              <div>
                <label htmlFor="cabinets" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.cabinets')}</label>
                <input type="number" id="cabinets" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
              <div>
                <label htmlFor="meeting-table" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.meetingTable')}</label>
                <input type="number" id="meeting-table" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
              <div>
                <label htmlFor="meeting-chair" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.meetingChair')}</label>
                <input type="number" id="meeting-chair" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
              <div>
                <label htmlFor="doors" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.doors')}</label>
                <input type="number" id="doors" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
              <div className="col-span-2">
                <label htmlFor="staircase" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('floorPlan.staircase')}</label>
                <input type="number" id="staircase" className={`w-full px-3 py-2 rounded-md border ${isDark ? 'bg-[#2f2f2f] border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`} />
              </div>
            </div>
          </div>
          <button className="w-full py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            {t('floorPlan.generate')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanModal;