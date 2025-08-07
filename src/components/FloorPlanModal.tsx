import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Home, Users, Ruler, Zap } from 'lucide-react';

interface FloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloorPlanModal: React.FC<FloorPlanModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dimensions');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'dimensions', label: 'Dimensions', icon: Ruler },
    { id: 'rooms', label: 'Rooms', icon: Home },
    { id: 'furniture', label: 'Furniture', icon: Users },
    { id: 'features', label: 'Features', icon: Zap },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${
        isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
      }`}>
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('floorPlan.modal.title')}
            </h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('floorPlan.modal.subtitle')}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex h-[calc(90vh-200px)] min-h-[500px]">
          {/* Sidebar Tabs */}
          <div className={`w-48 border-r ${isDark ? 'border-gray-700 bg-[#212121]' : 'border-gray-200 bg-gray-50'}`}>
            <div className="p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors mb-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : isDark
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="text-sm font-medium">{t(`floorPlan.modal.${tab.id}`)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto max-h-full">
            {activeTab === 'dimensions' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('floorPlan.modal.spaceDimensions')}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('floorPlan.modal.widthMeters')}
                    </label>
                    <input 
                      type="number" 
                      defaultValue="12"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`} 
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('floorPlan.modal.lengthMeters')}
                    </label>
                    <input 
                      type="number" 
                      defaultValue="15"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`} 
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('floorPlan.modal.ceilingHeight')}
                    </label>
                    <input 
                      type="number" 
                      defaultValue="3"
                      step="0.1"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`} 
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('floorPlan.modal.totalArea')}
                    </label>
                    <div className={`px-4 py-3 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}>
                      180 m²
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('floorPlan.modal.roomConfiguration')}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { key: 'bedrooms', defaultValue: 3 },
                    { key: 'bathrooms', defaultValue: 2 },
                    { key: 'livingAreas', defaultValue: 1 },
                    { key: 'kitchen', defaultValue: 1 },
                    { key: 'diningRoom', defaultValue: 1 },
                    { key: 'officeStudy', defaultValue: 1 },
                  ].map((room) => (
                    <div key={room.key}>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t(`floorPlan.modal.${room.key}`)}
                      </label>
                      <input 
                        type="number" 
                        defaultValue={room.defaultValue}
                        min="0"
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDark 
                            ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'furniture' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('floorPlan.modal.furnitureFixtures')}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { key: 'chairs', defaultValue: 8 },
                    { key: 'tables', defaultValue: 3 },
                    { key: 'cabinets', defaultValue: 5 },
                    { key: 'meetingTable', defaultValue: 1 },
                    { key: 'sofas', defaultValue: 2 },
                    { key: 'wardrobes', defaultValue: 3 },
                  ].map((item) => (
                    <div key={item.key}>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t(`floorPlan.modal.${item.key}`)}
                      </label>
                      <input 
                        type="number" 
                        defaultValue={item.defaultValue}
                        min="0"
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDark 
                            ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('floorPlan.modal.specialFeatures')}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('floorPlan.modal.doors')}
                    </label>
                    <input 
                      type="number" 
                      defaultValue="6"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`} 
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('floorPlan.modal.windows')}
                    </label>
                    <input 
                      type="number" 
                      defaultValue="8"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`} 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className={`text-md font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('floorPlan.modal.additionalFeatures')}
                  </h4>
                  {[
                    'staircase',
                    'balcony',
                    'fireplace',
                    'walkInCloset',
                    'laundryRoom',
                    'garage',
                  ].map((feature) => (
                    <label key={feature} className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t(`floorPlan.modal.${feature}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-between items-center p-6 border-t flex-shrink-0 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('floorPlan.modal.generationTime')}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {t('floorPlan.modal.cancel')}
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-colors ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? t('floorPlan.modal.generating') : t('floorPlan.modal.generateFloorPlan')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanModal;