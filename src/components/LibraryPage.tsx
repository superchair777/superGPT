import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useChat } from '../contexts/ChatContext';
import Header from './Header';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ExportModal from './ExportModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { 
  Plus, 
  SlidersHorizontal, 
  Mic, 
  Send, 
  Download, 
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  Heart,
  Share2,
  MoreVertical,
  Image as ImageIcon,
  Calendar,
  Tag,
  Folder,
  Star,
  Trash2,
  Maximize2,
  X
} from 'lucide-react';

const LibraryPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { messages: allMessages, sendMessage } = useChat();
  const sessionId = 'library';
  const messages = allMessages[sessionId] || [];
  const [message, setMessage] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<typeof images[0] | null>(null);

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(sessionId, { text: message, sender: 'user' });
      setMessage('');
      
      // Mock bot response
      setTimeout(() => {
        sendMessage(sessionId, { 
          text: "I've generated new images based on your description. The images are now available in your library. Would you like me to create variations or modify any specific aspects?", 
          sender: 'bot' 
        });
      }, 1000);
    }
  };

  const categories = [
    { id: 'all', name: 'All Images', count: 24 },
    { id: 'logos', name: 'Logos', count: 8 },
    { id: 'illustrations', name: 'Illustrations', count: 6 },
    { id: 'photos', name: 'Photos', count: 5 },
    { id: 'icons', name: 'Icons', count: 3 },
    { id: 'favorites', name: 'Favorites', count: 2 },
  ];

  const images = [
    { id: 1, src: '/placeholder1.svg', title: 'SuperChair Logo v1', category: 'logos', date: '2024-01-15', favorite: true, tags: ['logo', 'brand', 'chair'] },
    { id: 2, src: '/placeholder2.svg', title: 'SuperChair Logo v2', category: 'logos', date: '2024-01-14', favorite: false, tags: ['logo', 'brand', 'modern'] },
    { id: 3, src: '/placeholder3.svg', title: 'SuperChair Logo v3', category: 'logos', date: '2024-01-13', favorite: true, tags: ['logo', 'brand', 'minimal'] },
    { id: 4, src: '/placeholder4.svg', title: 'SuperChair Logo v4', category: 'logos', date: '2024-01-12', favorite: false, tags: ['logo', 'brand', 'colorful'] },
    { id: 5, src: '/placeholder1.svg', title: 'Chair Illustration', category: 'illustrations', date: '2024-01-11', favorite: false, tags: ['illustration', 'furniture'] },
    { id: 6, src: '/placeholder2.svg', title: 'Office Setup', category: 'photos', date: '2024-01-10', favorite: true, tags: ['photo', 'office', 'workspace'] },
  ];

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory || (selectedCategory === 'favorites' && image.favorite);
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleImageSelection = (imageId: number) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const toggleFavorite = (imageId: number) => {
    // In a real app, this would update the backend
    console.log('Toggle favorite for image:', imageId);
  };

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header sessionId={sessionId} />
      
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Main Library Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Library Header */}
          <div className={`flex items-center justify-between p-4 rounded-xl border mb-6 ${
            isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
          } shadow-sm`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ImageIcon size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('library.imageLibrary')}
                </h1>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {filteredImages.length} items
              </span>
            </div>
            
            <div className="flex items-center gap-3">
             {/* Export and Delete Buttons */}
             <button 
               onClick={() => setShowExport(true)} 
               className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                 isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               }`}
             >
               <Share2 size={18} />
               <span className="text-sm sr-only">Export</span>
             </button>
             <button 
               onClick={() => setShowDelete(true)} 
               className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                 isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               }`}
             >
               <Trash2 size={18} />
               <span className="text-sm sr-only">Delete</span>
             </button>
             
             <div className="w-px h-6 bg-gray-300 mx-2" />
             
              {selectedImages.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedImages.length} selected
                  </span>
                  <button className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}>
                    <Download size={18} />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}>
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  showFilters
                    ? 'bg-blue-600 text-white'
                    : isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Filter size={18} />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg transition-colors ${
                  isFullscreen
                    ? 'bg-blue-600 text-white'
                    : isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : t('common.fullscreen')}
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder={t('library.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-[#2f2f2f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
            </div>
            
            {showFilters && (
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300 border border-gray-600'
                          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {t(`library.${category.id === 'all' ? 'allImages' : category.id}`)} ({category.count})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Image Gallery */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      selectedImages.includes(image.id) ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                        onClick={() => setEnlargedImage(image)}
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 pointer-events-auto">
                        <button
                          onClick={() => toggleImageSelection(image.id)}
                          className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => toggleFavorite(image.id)}
                          className={`p-2 rounded-full transition-colors ${
                            image.favorite 
                              ? 'bg-red-500 text-white hover:bg-red-600' 
                              : 'bg-white text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          <Heart size={16} fill={image.favorite ? 'currentColor' : 'none'} />
                        </button>
                        <a
                          href={image.src}
                          download={`${image.title}.svg`}
                          className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          <Download size={16} />
                        </a>
                      </div>
                    </div>
                    
                    {/* Selection Checkbox */}
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        onChange={() => toggleImageSelection(image.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                    
                    {/* Favorite Star */}
                    {image.favorite && (
                      <div className="absolute top-2 right-2">
                        <Star size={16} className="text-yellow-400 fill-current" />
                      </div>
                    )}
                    
                    {/* Image Info */}
                    <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}>
                      <h3 className="font-medium text-sm truncate">{image.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={12} />
                        <span className="text-xs opacity-75">{image.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                      isDark 
                        ? 'bg-[#2f2f2f] border-gray-600 hover:bg-gray-600' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    } ${selectedImages.includes(image.id) ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      <img 
                        src={image.src} 
                        alt={image.title} 
                        className="w-full h-full object-cover cursor-pointer" 
                        onClick={() => setEnlargedImage(image)}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {image.title}
                        </h3>
                        {image.favorite && <Star size={16} className="text-yellow-400 fill-current flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {image.date}
                        </span>
                        <div className="flex gap-1">
                          {image.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-1 text-xs rounded-full ${
                                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(image.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Heart size={16} fill={image.favorite ? 'currentColor' : 'none'} />
                      </button>
                      <a
                        href={image.src}
                        download={`${image.title}.svg`}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Download size={16} />
                      </a>
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                      }`}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {filteredImages.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('library.noImagesFound')}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('library.noImagesDesc')}
                </p>
              </div>
            )}
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
              <Plus size={20} />
              {t('library.createImages')}
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('library.describeCreate')}
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <ImageIcon size={24} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('library.startCreating')}
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => setMessage(t('library.exampleLogo'))}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    🎨 {t('library.exampleLogo')}
                  </button>
                  <button
                    onClick={() => setMessage(t('library.exampleFurniture'))}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    🪑 {t('library.exampleFurniture')}
                  </button>
                  <button
                    onClick={() => setMessage(t('library.exampleIcons'))}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    ⭐ {t('library.exampleIcons')}
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
      
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} exportType="images" />
      <DeleteConfirmationModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          // Handle delete logic here
          console.log('Delete library items');
          setShowDelete(false);
        }}
      />
      
      {/* Image Enlargement Modal */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div 
            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Image */}
            <img
              src={enlargedImage.src}
              alt={enlargedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{enlargedImage.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm opacity-75">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{enlargedImage.date}</span>
                    </div>
                    <div className="flex gap-1">
                      {enlargedImage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white bg-opacity-20 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(enlargedImage.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      enlargedImage.favorite 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                    }`}
                  >
                    <Heart size={16} fill={enlargedImage.favorite ? 'currentColor' : 'none'} />
                  </button>
                  <a
                    href={enlargedImage.src}
                    download={`${enlargedImage.title}.svg`}
                    className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;