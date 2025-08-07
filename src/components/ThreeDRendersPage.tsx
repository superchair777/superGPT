import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useChat } from '../contexts/ChatContext';
import Header from './Header';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import CustomizationModal from './CustomizationModal';
import ExportModal from './ExportModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Play,
  Pause,
  Settings,
  Eye,
  Palette,
  Share2,
  Trash2
} from 'lucide-react';

const ThreeDRendersPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { messages: allMessages, sendMessage } = useChat();
  const sessionId = '3dRender';
  const messages = allMessages[sessionId] || [];
  const [message, setMessage] = useState('');
  const [currentRender, setCurrentRender] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [selectedMaterial, setSelectedMaterial] = useState('wood');
  const [selectedLighting, setSelectedLighting] = useState('natural');
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Listen for fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const totalRenders = 4;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(sessionId, { text: message, sender: 'user' });
      setMessage('');
      
      // Mock bot response
      setTimeout(() => {
        sendMessage(sessionId, { 
          text: "I've created a new 3D render with your specifications. The model features realistic materials and lighting. Would you like me to adjust the camera angle, materials, or lighting setup?", 
          sender: 'bot' 
        });
      }, 1000);
    }
  };

  const handlePrevRender = () => {
    setCurrentRender(prev => prev > 1 ? prev - 1 : totalRenders);
  };

  const handleNextRender = () => {
    setCurrentRender(prev => prev < totalRenders ? prev + 1 : 1);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header sessionId={sessionId} />
      
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Main 3D Viewer */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Viewer Header */}
          <div className={`flex items-center justify-between p-4 rounded-t-xl border-b ${
            isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('threeDRenders.threeDRenderViewer')}
              </h2>
              <span className={`px-3 py-1 text-xs rounded-full ${
                isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'
              }`}>
                {t('threeDRenders.highQuality')}
              </span>
            </div>
            
            {/* Viewer Controls */}
            <div className="flex items-center gap-2">
             {/* Export and Delete Buttons */}
             <button 
               onClick={() => setShowExport(true)} 
               className={`p-2 rounded-lg transition-colors ${
                 isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               }`}
               title="Export"
             >
               <Share2 size={18} />
             </button>
             <button 
               onClick={() => setShowDelete(true)} 
               className={`p-2 rounded-lg transition-colors ${
                 isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               }`}
               title="Delete"
             >
               <Trash2 size={18} />
             </button>
             <div className="w-px h-6 bg-gray-300 mx-2" />
              <button
                onClick={() => setIsCustomizationOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                title="Customization"
              >
                <Palette size={18} />
                <span className="text-sm font-medium">{t('common.customize')}</span>
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <button
                onClick={handleZoomOut}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title={t('common.zoomOut')}
              >
                <ZoomOut size={18} />
              </button>
              <span className={`px-3 py-1 text-sm rounded-md ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}>
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title={t('common.zoomIn')}
              >
                <ZoomIn size={18} />
              </button>
              <button
                onClick={handleResetZoom}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title={t('common.resetView')}
              >
                <RotateCcw size={18} />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <button
                onClick={toggleRotation}
                className={`p-2 rounded-lg transition-colors ${
                  isRotating 
                    ? 'bg-blue-600 text-white' 
                    : isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title={isRotating ? t('common.stopRotation') : t('common.autoRotate')}
              >
                {isRotating ? <Pause size={18} /> : <Play size={18} />}
              </button>
            </div>
          </div>

          {/* 3D Render Display */}
          <div className={`flex-1 flex items-center justify-center p-4 rounded-b-xl border-l border-r border-b min-h-0 ${
            isDark ? 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-gray-600' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
          }`}>
            <div 
              className={`relative rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
                isRotating ? 'animate-pulse' : ''
              } max-w-full max-h-full`}
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <img 
                src="/3d-render-placeholder.png"
                alt={`3D Render ${currentRender}`}
                className={`w-full h-auto max-w-4xl transition-transform duration-1000 ${
                  isRotating ? 'animate-spin' : ''
                } max-h-[60vh] object-contain`}
                style={{ animationDuration: isRotating ? '10s' : '0s' }}
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white px-4 py-2 rounded-xl">
                <div className="text-sm font-medium">{t('threeDRenders.render')} {currentRender}</div>
                <div className="text-xs opacity-75">{selectedMaterial} • {selectedLighting} lighting</div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <div className={`px-3 py-1 rounded-full text-xs ${
                  isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                }`}>
                  {t('threeDRenders.quality4k')}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between mt-4 flex-shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevRender}
                className={`p-2 rounded-lg transition-colors shadow-sm ${
                  isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className={`px-4 py-2 rounded-lg ${
                isDark ? 'bg-[#2f2f2f] text-gray-300' : 'bg-white text-gray-700 border'
              }`}>
                <span className="text-sm font-medium">{currentRender} / {totalRenders}</span>
              </div>
              <button
                onClick={handleNextRender}
                className={`p-2 rounded-lg transition-colors shadow-sm ${
                  isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg transition-colors shadow-sm ${
                  isFullscreen
                    ? 'bg-blue-600 text-white'
                    : isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : t('common.fullscreen')}
              >
                <Maximize2 size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors shadow-sm ${
                  isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
                title={t('common.download')}
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Chat Interface */}
        <div className={`w-96 flex flex-col rounded-xl border ${
          isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
        } shadow-lg min-h-0`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <Eye size={20} />
              {t('threeDRenders.renderAssistant')}
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('threeDRenders.renderDesc')}
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Settings size={24} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('threeDRenders.startConversation')}
                </p>
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => setMessage(t('threeDRenders.exampleLivingRoom'))}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    💡 {t('threeDRenders.exampleLivingRoom')}
                  </button>
                  <button
                    onClick={() => setMessage(t('threeDRenders.exampleLighting'))}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    🔆 {t('threeDRenders.exampleLighting')}
                  </button>
                  <button
                    onClick={() => setMessage(t('threeDRenders.examplePlants'))}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    🌿 {t('threeDRenders.examplePlants')}
                  </button>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))
            )}
          </div>
          
          <div className={`p-4 border-t flex-shrink-0 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <ChatInput
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
      
      <CustomizationModal 
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        selectedLighting={selectedLighting}
        setSelectedLighting={setSelectedLighting}
      />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} exportType="images" />
      <DeleteConfirmationModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          // Handle delete logic here
          console.log('Delete 3D render');
          setShowDelete(false);
        }}
      />
    </div>
  );
};

export default ThreeDRendersPage;