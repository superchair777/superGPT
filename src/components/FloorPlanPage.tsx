import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Maximize2, RotateCcw, ZoomIn, ZoomOut, Grid, Layers, Settings, Share2, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';
import ChatInput from './ChatInput';
import { useChat } from '../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import FloorPlanModal from './FloorPlanModal';
import ExportModal from './ExportModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const FloorPlanPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { messages: allMessages, sendMessage } = useChat();
  const sessionId = 'floorPlan';
  const messages = allMessages[sessionId] || [];
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [showExport, setShowExport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showLayers, setShowLayers] = useState(false);

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

  const totalImages = 3;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(sessionId, { text: message, sender: 'user' });
      setMessage('');
      
      // Mock bot response
      setTimeout(() => {
        sendMessage(sessionId, { 
          text: "I've generated a new floor plan based on your specifications. The layout optimizes space efficiency while maintaining good traffic flow. Would you like me to adjust any specific elements or create variations?", 
          sender: 'bot' 
        });
      }, 1000);
    }
  };

  const handlePrevImage = () => {
    setCurrentImage(prev => prev > 1 ? prev - 1 : totalImages);
  };

  const handleNextImage = () => {
    setCurrentImage(prev => prev < totalImages ? prev + 1 : 1);
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

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header sessionId={sessionId} />

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden min-h-0">
        {/* Left Column: Floor Plan Viewer */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Toolbar */}
          <div className={`flex items-center justify-between p-4 rounded-t-xl border-b ${
            isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center gap-2">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('floorPlan.floorPlanViewer')}
              </h2>
              <span className={`px-2 py-1 text-xs rounded-full ${
                isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
              }`}>
                {t('floorPlan.generated')}
              </span>
            </div>
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
                title={t('common.resetZoom')}
              >
                <RotateCcw size={18} />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <button
                className={`p-2 rounded-lg transition-colors ${
                  showGrid
                    ? 'bg-blue-600 text-white'
                    : isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title={showGrid ? 'Hide Grid' : 'Show Grid'}
                onClick={() => setShowGrid(!showGrid)}
              >
                <Grid size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  showLayers
                    ? 'bg-blue-600 text-white'
                    : isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Toggle Layers Panel"
                onClick={() => setShowLayers(!showLayers)}
              >
                <Layers size={18} />
              </button>
            </div>
          </div>

          {/* Floor Plan Display */}
          <div className={`flex-1 flex items-center justify-center p-4 rounded-b-xl border-l border-r border-b min-h-0 ${
            isDark ? 'bg-[#1a1a1a] border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            {/* Grid Overlay */}
            {showGrid && (
              <div 
                className="absolute inset-4 pointer-events-none opacity-20 rounded-lg"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, ${isDark ? '#666' : '#ccc'} 1px, transparent 1px),
                    linear-gradient(to bottom, ${isDark ? '#666' : '#ccc'} 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            )}
            
            <div 
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 max-w-full max-h-full"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <img 
                src="/floorplan-placeholder.png"
                alt={`Floor plan ${currentImage}`}
                className="w-full h-auto max-w-3xl max-h-[60vh] object-contain"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {t('floorPlan.plan')} {currentImage}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4 flex-shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md hover:shadow-lg"
            >
              {t('floorPlan.generateNewFloorPlan')}
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevImage}
                className={`p-2 rounded-lg transition-colors shadow-sm ${
                  isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className={`px-4 py-2 rounded-lg ${
                isDark ? 'bg-[#2f2f2f] text-gray-300' : 'bg-white text-gray-700 border'
              }`}>
                <span className="text-sm font-medium">{currentImage} / {totalImages}</span>
              </div>
              <button
                onClick={handleNextImage}
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

        {/* Right Column: Chat Interface */}
        <div className={`${showLayers ? 'w-80' : 'w-96'} flex flex-col rounded-xl border ${
          isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
        } shadow-lg min-h-0`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('floorPlan.designAssistant')}
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('floorPlan.designDesc')}
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Settings size={24} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('floorPlan.startConversation')}
                </p>
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
        
        {/* Layers Panel */}
        {showLayers && (
          <div className={`w-64 rounded-xl border ${
            isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
          } shadow-lg`}>
            <div className={`p-4 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Layers
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: 'Walls', visible: true, color: 'bg-gray-500' },
                { name: 'Doors', visible: true, color: 'bg-brown-500' },
                { name: 'Windows', visible: true, color: 'bg-blue-500' },
                { name: 'Furniture', visible: true, color: 'bg-green-500' },
                { name: 'Dimensions', visible: false, color: 'bg-red-500' },
                { name: 'Labels', visible: true, color: 'bg-purple-500' },
              ].map((layer, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={layer.visible}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    onChange={() => {
                      // Layer visibility toggle logic would go here
                      console.log(`Toggle ${layer.name} visibility`);
                    }}
                  />
                  <div className={`w-4 h-4 rounded ${layer.color}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {layer.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <FloorPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} exportType="images" />
      <DeleteConfirmationModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        deleteType="images"
        onConfirm={() => {
          // Handle delete logic here
          console.log('Delete floor plan');
          setShowDelete(false);
        }}
      />
    </div>
  );
};

export default FloorPlanPage;