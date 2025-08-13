import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useChat } from '../contexts/ChatContext';
import { geminiService } from '../services/geminiService';
import Header from './Header';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ExportModal from './ExportModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { 
  Search,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Share2,
  Trash2,
  Upload,
  FileImage,
  Building2,
  Package,
  Plus,
  Minus,
  X,
  CheckCircle
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
  onSale: boolean;
  dimensions: string;
  materials: string[];
  colors: string[];
  features: string[];
  description: string;
}

const CompanyCataloguePage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { messages: allMessages, sendMessage, saveChatToHistory } = useChat();
  const sessionId = 'companyCatalogue';
  const messages = allMessages[sessionId] || [];
  const [message, setMessage] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(sessionId, { text: message, sender: 'user' });
      setMessage('');
      setIsLoading(true);
      
      try {
        const aiResponse = await geminiService.generateChatResponse(message, messages);
        
        sendMessage(sessionId, { 
          text: aiResponse, 
          sender: 'bot' 
        });
        
        setTimeout(() => {
          saveChatToHistory(sessionId, 'companyCatalogue');
        }, 500);
      } catch (error) {
        console.error('Error getting AI response:', error);
        sendMessage(sessionId, { 
          text: "I apologize, but I'm having trouble processing your request right now. Please try again later.", 
          sender: 'bot' 
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const categories = [
    { id: 'all', name: t('catalogue.allProducts'), count: 24 },
    { id: 'chairs', name: t('catalogue.chairs'), count: 8 },
    { id: 'tables', name: t('catalogue.tables'), count: 6 },
    { id: 'cabinets', name: t('catalogue.cabinets'), count: 4 },
    { id: 'desks', name: t('catalogue.desks'), count: 3 },
    { id: 'storage', name: t('catalogue.storage'), count: 3 },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Conference Table Elite',
      price: 45900,
      rating: 4.9,
      reviews: 127,
      image: '/placeholder1.svg',
      category: 'tables',
      inStock: true,
      onSale: false,
      dimensions: '240 × 120 × 75 cm',
      materials: ['Premium Oak Wood', 'Steel Frame'],
      colors: ['Natural Oak', 'Dark Walnut', 'White'],
      features: ['Cable Management', 'Adjustable Height', 'Scratch Resistant'],
      description: 'Premium conference table designed for executive meetings and boardrooms.'
    },
    {
      id: 2,
      name: 'Ergonomic Task Chair',
      price: 8900,
      originalPrice: 11900,
      rating: 4.4,
      reviews: 89,
      image: '/placeholder2.svg',
      category: 'chairs',
      inStock: true,
      onSale: true,
      dimensions: '60 × 60 × 110 cm',
      materials: ['Mesh Fabric', 'Aluminum Base'],
      colors: ['Black', 'Gray', 'Blue'],
      features: ['Lumbar Support', '360° Swivel', 'Height Adjustable'],
      description: 'Comfortable ergonomic chair perfect for long working hours.'
    },
    {
      id: 3,
      name: 'Meeting Table Round',
      price: 18900,
      rating: 4.7,
      reviews: 156,
      image: '/placeholder3.svg',
      category: 'tables',
      inStock: true,
      onSale: false,
      dimensions: 'Ø120cm × H75cm',
      materials: ['Solid Wood', 'Metal Legs'],
      colors: ['Natural', 'Espresso', 'White'],
      features: ['Round Design', 'Stable Base', 'Easy Assembly'],
      description: 'Perfect round meeting table for collaborative discussions.'
    },
    {
      id: 4,
      name: 'ModernDesk Pro',
      price: 24900,
      rating: 4.6,
      reviews: 203,
      image: '/placeholder4.svg',
      category: 'desks',
      inStock: false,
      onSale: false,
      dimensions: '160 × 80 × 75 cm',
      materials: ['Laminated Wood', 'Steel Frame'],
      colors: ['White', 'Black', 'Oak'],
      features: ['Built-in USB Ports', 'Cable Management', 'Drawer Storage'],
      description: 'Modern desk with integrated technology features for the digital workplace.'
    },
    {
      id: 5,
      name: 'Executive Storage Cabinet',
      price: 32900,
      rating: 4.8,
      reviews: 94,
      image: '/placeholder1.svg',
      category: 'cabinets',
      inStock: true,
      onSale: false,
      dimensions: '120 × 45 × 180 cm',
      materials: ['Premium Wood', 'Soft-Close Hinges'],
      colors: ['Mahogany', 'Cherry', 'Black'],
      features: ['Locking Doors', 'Adjustable Shelves', 'Anti-Tip Design'],
      description: 'Elegant storage solution for executive offices and meeting rooms.'
    },
    {
      id: 6,
      name: 'Collaborative Workspace Table',
      price: 15900,
      rating: 4.3,
      reviews: 67,
      image: '/placeholder2.svg',
      category: 'tables',
      inStock: true,
      onSale: true,
      dimensions: '180 × 90 × 75 cm',
      materials: ['Engineered Wood', 'Powder Coated Steel'],
      colors: ['Light Gray', 'Natural', 'White'],
      features: ['Modular Design', 'Easy Reconfiguration', 'Durable Surface'],
      description: 'Flexible table system perfect for modern collaborative workspaces.'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.materials.some(material => material.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyzeFloorPlan = () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        detectedItems: [
          { name: 'Conference Table', quantity: 2, confidence: 95, price: 45900 },
          { name: 'Office Chairs', quantity: 12, confidence: 88, price: 8900 },
          { name: 'Storage Cabinets', quantity: 4, confidence: 92, price: 32900 },
          { name: 'Meeting Table', quantity: 1, confidence: 85, price: 18900 },
        ],
        totalEstimate: (2 * 45900) + (12 * 8900) + (4 * 32900) + (1 * 18900)
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleAddToQuotation = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowQuotationModal(true);
  };

  const handleConfirmQuotation = () => {
    if (selectedProduct) {
      // Show toast notification
      setToastMessage(`Added ${quantity} ${selectedProduct.name}${quantity > 1 ? 's' : ''} to quotation!`);
      setShowToast(true);
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
      // Close modal
      setShowQuotationModal(false);
      setSelectedProduct(null);
      setQuantity(1);
      
      console.log('Added to quotation:', {
        product: selectedProduct.name,
        quantity: quantity,
        unitPrice: selectedProduct.price,
        totalPrice: selectedProduct.price * quantity
      });
    }
  };

  const adjustQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(999, prev + change)));
  };

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header sessionId={sessionId} />
      
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Main Catalogue Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Catalogue Header */}
          <div className={`flex items-center justify-between p-4 rounded-xl border mb-6 ${
            isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
          } shadow-sm`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Building2 size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('catalogue.companyProducts')}
                </h1>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {filteredProducts.length} {t('catalogue.products')}
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
                placeholder={t('catalogue.searchProducts')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-[#2f2f2f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-[#2f2f2f] border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="name">{t('catalogue.sortByName')}</option>
              <option value="price-low">{t('catalogue.sortByPriceLow')}</option>
              <option value="price-high">{t('catalogue.sortByPriceHigh')}</option>
              <option value="rating">{t('catalogue.sortByRating')}</option>
            </select>
            
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
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Grid/List */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isDark ? 'bg-[#2f2f2f] border border-gray-600' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="relative aspect-square bg-gray-200 dark:bg-gray-700">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.onSale && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                            {t('catalogue.sale')}
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">
                            {t('catalogue.outOfStock')}
                          </span>
                        )}
                      </div>
                      
                      {/* Favorite Button */}
                      <button className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
                      </button>
                      
                      {/* Quick Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors">
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {product.rating} ({product.reviews} {t('catalogue.reviews')})
                        </span>
                      </div>
                      
                      <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                      </h3>
                      
                      <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {product.dimensions}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            ฿{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              ฿{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleAddToQuotation(product)}
                        disabled={!product.inStock}
                        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-400 cursor-not-allowed text-white'
                        }`}
                      >
                        <ShoppingCart size={16} />
                        {t('catalogue.addToQuotation')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                      isDark 
                        ? 'bg-[#2f2f2f] border-gray-600 hover:bg-gray-600' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {product.rating} ({product.reviews} {t('catalogue.reviews')})
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {product.onSale && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                              {t('catalogue.sale')}
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">
                              {t('catalogue.outOfStock')}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {product.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div>
                          <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('catalogue.dimensions')}: 
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            {product.dimensions}
                          </span>
                        </div>
                        <div>
                          <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('catalogue.materials')}: 
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            {product.materials.join(', ')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            ฿{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              ฿{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                          }`}>
                            <Heart size={16} />
                          </button>
                          <button className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                          }`}>
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleAddToQuotation(product)}
                            disabled={!product.inStock}
                            className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                              product.inStock
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-400 cursor-not-allowed text-white'
                            }`}
                          >
                            <ShoppingCart size={16} />
                            {t('catalogue.addToQuotation')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <Package size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('catalogue.noProductsFound')}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('catalogue.tryDifferentSearch')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Floor Plan Upload & Analysis */}
        <div className={`w-96 flex-shrink-0 flex flex-col rounded-xl border ${
          isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
        } shadow-lg min-h-0`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <Upload size={20} />
              {t('catalogue.uploadFloorPlan')}
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('catalogue.uploadFloorPlanDesc')}
            </p>
          </div>
          
          <div className="flex-1 p-4 space-y-4 min-h-0">
            {!uploadedFile ? (
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDark 
                  ? 'border-gray-600 hover:border-gray-500 bg-[#212121]' 
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
              }`}>
                <FileImage size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <h4 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('catalogue.dragDropFloorPlan')}
                </h4>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('catalogue.supportedFormats')}
                </p>
                <input
                  type="file"
                  id="floorplan-upload"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="floorplan-upload"
                  className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
                >
                  {t('catalogue.browseFiles')}
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  isDark ? 'bg-[#212121] border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <FileImage size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {uploadedFile.name}
                    </span>
                  </div>
                  <button
                    onClick={handleAnalyzeFloorPlan}
                    disabled={isAnalyzing}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      isAnalyzing
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isAnalyzing ? t('catalogue.analyzing') : t('catalogue.analyzeFloorPlan')}
                  </button>
                </div>

                {isAnalyzing && (
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-[#212121] border-gray-600' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('catalogue.analyzingFloorPlan')}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('catalogue.identifyingProducts')}
                    </p>
                  </div>
                )}

                {analysisResults && (
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-[#212121] border-gray-600' : 'bg-green-50 border-green-200'
                  }`}>
                    <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <CheckCircle size={20} className="text-green-500" />
                      {t('catalogue.analysisComplete')}
                    </h4>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('catalogue.detectedProducts').replace('{count}', analysisResults.detectedItems.length)}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <h5 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('catalogue.detectedItems')}:
                      </h5>
                      {analysisResults.detectedItems.map((item: any, index: number) => (
                        <div key={index} className={`flex justify-between items-center p-2 rounded ${
                          isDark ? 'bg-gray-700' : 'bg-white'
                        }`}>
                          <div>
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {item.name}
                            </span>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {t('catalogue.quantity')}: {item.quantity} | {t('catalogue.confidence')}: {item.confidence}%
                            </div>
                          </div>
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            ฿{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`p-3 rounded-lg border-t ${
                      isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t('catalogue.totalEstimate')}:
                        </span>
                        <span className={`text-xl font-bold text-blue-600`}>
                          ฿{analysisResults.totalEstimate.toLocaleString()}
                        </span>
                      </div>
                      <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        {t('catalogue.generateQuotation')}
                      </button>
                    </div>
                  </div>
                )}

                {!analysisResults && !isAnalyzing && (
                  <div className={`p-4 rounded-lg border text-center ${
                    isDark ? 'bg-[#212121] border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <Package size={32} className={`mx-auto mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('catalogue.uploadToAnalyze')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className={`p-4 border-t flex-shrink-0 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <ChatInput
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Quotation Modal */}
      {showQuotationModal && selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuotationModal(false)}
        >
          <div 
            className={`rounded-2xl shadow-2xl w-full max-w-md ${
              isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Add to Quotation
                </h2>
                <button 
                  onClick={() => setShowQuotationModal(false)} 
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedProduct.name}
                  </h3>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedProduct.dimensions}
                  </p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ฿{selectedProduct.price.toLocaleString()} <span className="text-sm font-normal">per unit</span>
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => adjustQuantity(-1)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isDark 
                        ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                        : 'border-gray-300 hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(999, parseInt(e.target.value) || 1)))}
                    className={`w-20 text-center py-2 px-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    }`}
                  />
                  <button
                    onClick={() => adjustQuantity(1)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isDark 
                        ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                        : 'border-gray-300 hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className={`p-4 rounded-lg border mb-6 ${
                isDark ? 'bg-[#212121] border-gray-600' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Unit Price:
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ฿{selectedProduct.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Quantity:
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {quantity} {quantity === 1 ? 'unit' : 'units'}
                    </span>
                  </div>
                  <div className="border-t pt-2 border-gray-300 dark:border-gray-600">
                    <div className="flex justify-between">
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Total Price:
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        ฿{(selectedProduct.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowQuotationModal(false)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmQuotation}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  <ShoppingCart size={16} />
                  Add to Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
            isDark 
              ? 'bg-green-800 border-green-700 text-white' 
              : 'bg-green-50 border-green-200 text-green-800'
          }`}>
            <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
            <span className="font-medium">{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className={`p-1 rounded-full transition-colors ${
                isDark ? 'hover:bg-green-700' : 'hover:bg-green-100'
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} exportType="images" />
      <DeleteConfirmationModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        deleteType="images"
        onConfirm={() => {
          console.log('Delete products');
          setShowDelete(false);
        }}
      />
    </div>
  );
};

export default CompanyCataloguePage;