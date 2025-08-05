import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Download, Maximize2, RotateCcw, ZoomIn, ZoomOut, Grid, Layers, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';
import ChatInput from './ChatInput';
import { useChat } from '../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import FloorPlanModal from './FloorPlanModal';

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
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className={`flex items-center justify-between p-4 rounded-t-xl border-b ${
            isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center gap-2">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Floor Plan Viewer
              </h2>
              <span className={`px-2 py-1 text-xs rounded-full ${
                isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
              }`}>
                Generated
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Zoom Out"
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
                title="Zoom In"
              >
                <ZoomIn size={18} />
              </button>
              <button
                onClick={handleResetZoom}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Reset Zoom"
              >
                <RotateCcw size={18} />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <button
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Toggle Grid"
              >
                <Grid size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Layers"
              >
                <Layers size={18} />
              </button>
            </div>
          </div>

          {/* Floor Plan Display */}
          <div className={`flex-1 flex items-center justify-center p-8 rounded-b-xl border-l border-r border-b ${
            isDark ? 'bg-[#1a1a1a] border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div 
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <img 
                src="/floorplan-placeholder.png"
                alt={`Floor plan ${currentImage}`}
                className="w-full h-auto max-w-2xl"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                Plan {currentImage}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg hover:shadow-xl"
            >
              {t('floorPlan.generateButton')}
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevImage}
                className={`p-3 rounded-xl transition-colors shadow-md ${
                  isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <div className={`px-4 py-2 rounded-lg ${
                isDark ? 'bg-[#2f2f2f] text-gray-300' : 'bg-white text-gray-700 border'
              }`}>
                <span className="text-sm font-medium">{currentImage} / {totalImages}</span>
              </div>
              <button
                onClick={handleNextImage}
                className={`p-3 rounded-xl transition-colors shadow-md ${
                  isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`p-3 rounded-xl transition-colors shadow-md ${
                  isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
                title="Fullscreen"
              >
                <Maximize2 size={20} />
              </button>
              <button
                className={`p-3 rounded-xl transition-colors shadow-md ${
                  isDark ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600 border'
                }`}
                title="Download"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className={`w-96 flex flex-col rounded-xl border ${
          isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
        } shadow-lg`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Design Assistant
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Describe your floor plan requirements
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Settings size={24} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Start a conversation to customize your floor plan
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))
            )}
          </div>
          
          <div className={`p-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <ChatInput
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
      
      <FloorPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default FloorPlanPage;