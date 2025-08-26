import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { X, Palette, Lightbulb, Camera, Layers, Sliders, Sparkles } from 'lucide-react';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMaterial: string;
  setSelectedMaterial: (material: string) => void;
  selectedLighting: string;
  setSelectedLighting: (lighting: string) => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  selectedMaterial,
  setSelectedMaterial,
  selectedLighting,
  setSelectedLighting,
}) => {
  const { isDark } = useTheme();

  const materials = [
    { id: 'wood', name: 'Wood', color: 'bg-amber-600', description: 'Natural wood textures' },
    { id: 'metal', name: 'Metal', color: 'bg-gray-500', description: 'Brushed metal finish' },
    { id: 'fabric', name: 'Fabric', color: 'bg-blue-500', description: 'Soft textile materials' },
    { id: 'leather', name: 'Leather', color: 'bg-amber-800', description: 'Premium leather surfaces' },
    { id: 'glass', name: 'Glass', color: 'bg-cyan-400', description: 'Transparent glass elements' },
    { id: 'concrete', name: 'Concrete', color: 'bg-gray-400', description: 'Industrial concrete look' },
  ];

  const lightingOptions = [
    { id: 'natural', name: 'Natural', icon: '☀️', description: 'Daylight simulation' },
    { id: 'warm', name: 'Warm', icon: '🔥', description: 'Cozy warm lighting' },
    { id: 'cool', name: 'Cool', icon: '❄️', description: 'Cool white lighting' },
    { id: 'dramatic', name: 'Dramatic', icon: '🎭', description: 'High contrast shadows' },
    { id: 'soft', name: 'Soft', icon: '🌙', description: 'Gentle ambient light' },
    { id: 'studio', name: 'Studio', icon: '💡', description: 'Professional studio setup' },
  ];

  const cameraAngles = [
    { id: 'front', name: 'Front View', description: 'Direct frontal perspective' },
    { id: 'side', name: 'Side View', description: 'Profile perspective' },
    { id: 'top', name: 'Top View', description: 'Bird\'s eye view' },
    { id: 'corner', name: 'Corner View', description: '3/4 angle perspective' },
    { id: 'close', name: 'Close-up', description: 'Detailed close view' },
    { id: 'wide', name: 'Wide Shot', description: 'Full scene overview' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${
        isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
      }`}>
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <Palette size={24} className={isDark ? 'text-white' : 'text-blue-600'} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Render Customization
              </h2>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Customize materials, lighting, and camera settings for your 3D render
              </p>
            </div>
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

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Materials Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Materials
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material.id)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                      selectedMaterial === material.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : isDark
                          ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 hover:border-gray-500'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-4 h-4 rounded-full ${material.color}`} />
                      <span className={`font-medium ${
                        selectedMaterial === material.id 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {material.name}
                      </span>
                    </div>
                    <p className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {material.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={20} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Lighting
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {lightingOptions.map((lighting) => (
                  <button
                    key={lighting.id}
                    onClick={() => setSelectedLighting(lighting.id)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                      selectedLighting === lighting.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : isDark
                          ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 hover:border-gray-500'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{lighting.icon}</span>
                      <span className={`font-medium ${
                        selectedLighting === lighting.id 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {lighting.name}
                      </span>
                    </div>
                    <p className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {lighting.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Angles Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Camera size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Camera Angle
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cameraAngles.map((angle) => (
                  <button
                    key={angle.id}
                    className={`p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                      isDark
                        ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 hover:border-gray-500'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Camera size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {angle.name}
                      </span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {angle.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sliders size={20} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Advanced Settings
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Render Quality
                  </label>
                  <select className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}>
                    <option value="draft">Draft (Fast)</option>
                    <option value="standard">Standard</option>
                    <option value="high" selected>High Quality</option>
                    <option value="ultra">Ultra (Slow)</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Resolution
                  </label>
                  <select className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}>
                    <option value="1080p">1080p (1920×1080)</option>
                    <option value="4k" selected>4K (3840×2160)</option>
                    <option value="8k">8K (7680×4320)</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="shadows" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <label htmlFor="shadows" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Enable realistic shadows
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="reflections" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" defaultChecked />
                  <label htmlFor="reflections" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Enable reflections
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-between items-center p-6 border-t ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Estimated render time: ~2-5 minutes
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
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg hover:shadow-xl"
            >
              <Sparkles size={16} />
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;