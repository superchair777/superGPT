import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useChat } from '../contexts/ChatContext';
import Header from './Header';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Eye,
  Ruler,
  DollarSign,
  Star,
  ChevronDown,
  Package,
  Maximize2,
  X,
  Upload,
  FileImage,
  Zap,
  Calculator,
  CheckCircle
} from 'lucide-react';

const CompanyCataloguePage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { sendMessage } = useChat();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const categories = [
    { id: 'all', name: t('catalogue.allProducts'), count: 24 },
    { id: 'chairs', name: t('catalogue.chairs'), count: 8 },
    { id: 'tables', name: t('catalogue.tables'), count: 6 },
    { id: 'cabinets', name: t('catalogue.cabinets'), count: 5 },
    { id: 'desks', name: t('catalogue.desks'), count: 3 },
    { id: 'storage', name: t('catalogue.storage'), count: 2 },
  ];

  const products = [
    {
      id: 1,
      name: 'SuperChair Executive',
      category: 'chairs',
      price: 15900,
      originalPrice: 18900,
      currency: '฿',
      image: 'https://images.pexels.com/photos/586763/pexels-photo-586763.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      reviews: 124,
      inStock: true,
      dimensions: {
        width: 65,
        depth: 70,
        height: 120,
        seatHeight: 45,
        unit: 'cm'
      },
      materials: ['Genuine Leather', 'Steel Frame', 'Memory Foam'],
      colors: ['Black', 'Brown', 'White'],
      features: ['Ergonomic Design', 'Height Adjustable', '360° Swivel', 'Lumbar Support'],
      description: 'Premium executive chair with genuine leather upholstery and advanced ergonomic features.'
    },
    {
      id: 2,
      name: 'ModernDesk Pro',
      category: 'desks',
      price: 24900,
      currency: '฿',
      image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      dimensions: {
        width: 160,
        depth: 80,
        height: 75,
        unit: 'cm'
      },
      materials: ['Oak Wood', 'Steel Legs', 'Laminate Surface'],
      colors: ['Natural Oak', 'Walnut', 'White'],
      features: ['Cable Management', 'Adjustable Feet', 'Scratch Resistant'],
      description: 'Modern office desk with built-in cable management and premium oak finish.'
    },
    {
      id: 3,
      name: 'Conference Table Elite',
      category: 'tables',
      price: 45900,
      currency: '฿',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      reviews: 67,
      inStock: true,
      dimensions: {
        width: 240,
        depth: 120,
        height: 75,
        unit: 'cm'
      },
      materials: ['Solid Wood', 'Steel Base', 'Glass Top'],
      colors: ['Dark Walnut', 'Light Oak'],
      features: ['Seats 8 People', 'Cable Ports', 'Scratch Resistant Glass'],
      description: 'Premium conference table perfect for executive meetings and presentations.'
    },
    {
      id: 4,
      name: 'Storage Cabinet Max',
      category: 'cabinets',
      price: 12900,
      currency: '฿',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.5,
      reviews: 156,
      inStock: false,
      dimensions: {
        width: 80,
        depth: 40,
        height: 180,
        unit: 'cm'
      },
      materials: ['MDF', 'Metal Handles', 'Soft-Close Hinges'],
      colors: ['White', 'Gray', 'Black'],
      features: ['4 Shelves', 'Lockable', 'Soft-Close Doors', 'Anti-Tip'],
      description: 'Spacious storage cabinet with multiple shelves and security lock.'
    },
    {
      id: 5,
      name: 'Ergonomic Task Chair',
      category: 'chairs',
      price: 8900,
      originalPrice: 11900,
      currency: '฿',
      image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.4,
      reviews: 203,
      inStock: true,
      dimensions: {
        width: 60,
        depth: 60,
        height: 110,
        seatHeight: 42,
        unit: 'cm'
      },
      materials: ['Mesh Back', 'Fabric Seat', 'Plastic Base'],
      colors: ['Black', 'Gray', 'Blue'],
      features: ['Breathable Mesh', 'Height Adjustable', 'Tilt Function'],
      description: 'Comfortable task chair with breathable mesh back and ergonomic support.'
    },
    {
      id: 6,
      name: 'Meeting Table Round',
      category: 'tables',
      price: 18900,
      currency: '฿',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      reviews: 45,
      inStock: true,
      dimensions: {
        diameter: 120,
        height: 75,
        unit: 'cm'
      },
      materials: ['Laminate Top', 'Steel Pedestal', 'ABS Edge'],
      colors: ['White', 'Maple', 'Cherry'],
      features: ['Seats 4 People', 'Stable Base', 'Easy Assembly'],
      description: 'Round meeting table ideal for small team discussions and brainstorming.'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency}${price.toLocaleString()}`;
  };

  const formatDimensions = (dimensions: any) => {
    if (dimensions.diameter) {
      return `⌀${dimensions.diameter}${dimensions.unit} × H${dimensions.height}${dimensions.unit}`;
    }
    return `${dimensions.width} × ${dimensions.depth} × ${dimensions.height} ${dimensions.unit}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFloorPlan = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        detectedProducts: [
          { product: products[0], quantity: 4, confidence: 95 }, // SuperChair Executive
          { product: products[2], quantity: 1, confidence: 92 }, // Conference Table Elite
          { product: products[3], quantity: 2, confidence: 88 }, // Storage Cabinet Max
          { product: products[1], quantity: 2, confidence: 85 }, // ModernDesk Pro
        ],
        totalCost: 0,
        roomType: 'Executive Office',
        area: '45 m²'
      };
      
      // Calculate total cost
      mockAnalysis.totalCost = mockAnalysis.detectedProducts.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      
      // Send analysis to chat
      const sessionId = 'catalogue-analysis';
      sendMessage(sessionId, {
        text: `Floor plan analysis complete! I've identified ${mockAnalysis.detectedProducts.length} product types in your ${mockAnalysis.roomType} layout. Total estimated cost: ${formatPrice(mockAnalysis.totalCost, '฿')}`,
        sender: 'bot'
      });
    }, 3000);
  };

  const generateQuotation = () => {
    if (!analysisResult) return;
    
    const quotationData = {
      date: new Date().toLocaleDateString(),
      products: analysisResult.detectedProducts,
      total: analysisResult.totalCost,
      roomType: analysisResult.roomType,
      area: analysisResult.area
    };
    
    // In a real app, this would generate a PDF or send to backend
    console.log('Generating quotation:', quotationData);
    alert('Quotation generated successfully! Check your downloads folder.');
  };

  return (
    <div className={`flex-1 flex flex-col h-full ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header />
      
      <div className="flex-1 p-6 min-h-0">
        {/* Page Header */}
        <div className={`flex items-center justify-between p-6 rounded-xl border mb-6 ${
          isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
        } shadow-sm`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Upload size={18} />
                <span className="text-sm font-medium">{t('catalogue.uploadFloorPlan')}</span>
              </button>
              
              <Package size={28} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('catalogue.companyProducts')}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('catalogue.premiumFurniture')}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${
              isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
            }`}>
              {sortedProducts.length} {t('catalogue.products')}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
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
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-3 rounded-lg border transition-colors appearance-none pr-10 ${
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
            <ChevronDown size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
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
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group rounded-xl border transition-all duration-300 hover:shadow-xl ${
                    isDark 
                      ? 'bg-[#2f2f2f] border-gray-600 hover:border-gray-500' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="relative aspect-square rounded-t-xl overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {t('catalogue.outOfStock')}
                        </span>
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {t('catalogue.sale')}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100'
                        }`}
                      >
                        <Heart size={16} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Ruler size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formatDimensions(product.dimensions)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {formatPrice(product.price, product.currency)}
                      </span>
                      {product.originalPrice && (
                        <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {formatPrice(product.originalPrice, product.currency)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        disabled={!product.inStock}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={16} />
                        {t('catalogue.addToQuotation')}
                      </button>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`flex gap-6 p-6 rounded-xl border transition-colors ${
                    isDark 
                      ? 'bg-[#2f2f2f] border-gray-600 hover:bg-gray-600' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover cursor-pointer" 
                      onClick={() => setSelectedProduct(product)}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {product.rating} ({product.reviews} {t('catalogue.reviews')})
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Ruler size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('catalogue.dimensions')}
                          </span>
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {formatDimensions(product.dimensions)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Package size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('catalogue.materials')}
                          </span>
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {product.materials.join(', ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatPrice(product.price, product.currency)}
                        </span>
                        {product.originalPrice && (
                          <span className={`text-lg line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {formatPrice(product.originalPrice, product.currency)}
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {t('catalogue.outOfStock')}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          disabled={!product.inStock}
                          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            product.inStock
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className={`rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${
              isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex justify-between items-center p-6 border-b ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedProduct.name}
              </h2>
              <button 
                onClick={() => setSelectedProduct(null)} 
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={20} className="text-yellow-400 fill-current" />
                    <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedProduct.rating}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      ({selectedProduct.reviews} {t('catalogue.reviews')})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatPrice(selectedProduct.price, selectedProduct.currency)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className={`text-xl line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatPrice(selectedProduct.originalPrice, selectedProduct.currency)}
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-base mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedProduct.description}
                  </p>
                  
                  {/* Specifications */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('catalogue.dimensions')}
                      </h4>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {formatDimensions(selectedProduct.dimensions)}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('catalogue.materials')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.materials.map((material, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${
                              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('catalogue.availableColors')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${
                              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('catalogue.features')}
                      </h4>
                      <ul className={`space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      disabled={!selectedProduct.inStock}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-colors ${
                        selectedProduct.inStock
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={20} />
                      {selectedProduct.inStock ? t('catalogue.addToQuotation') : t('catalogue.outOfStock')}
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className={`p-3 rounded-lg transition-colors ${
                        favorites.includes(selectedProduct.id)
                          ? 'bg-red-500 text-white'
                          : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Heart size={20} fill={favorites.includes(selectedProduct.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      className={`p-3 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Floor Plan Upload Modal */}
      {showUploadModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <div 
            className={`rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${
              isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex justify-between items-center p-6 border-b ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('catalogue.uploadFloorPlan')}
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('catalogue.uploadFloorPlanDesc')}
                </p>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)} 
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Area */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('catalogue.uploadImage')}
                  </h3>
                  
                  {!uploadedImage ? (
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      isDark ? 'border-gray-600 hover:border-gray-500 bg-[#212121]' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="floor-plan-upload"
                      />
                      <label htmlFor="floor-plan-upload" className="cursor-pointer">
                        <FileImage size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        <p className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t('catalogue.dragDropFloorPlan')}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {t('catalogue.supportedFormats')}
                        </p>
                        <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                          {t('catalogue.browseFiles')}
                        </button>
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative rounded-xl overflow-hidden">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded floor plan" 
                          className="w-full h-64 object-cover"
                        />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={analyzeFloorPlan}
                        disabled={isAnalyzing}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-colors ${
                          isAnalyzing
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <Zap size={20} />
                        {isAnalyzing ? t('catalogue.analyzing') : t('catalogue.analyzeFloorPlan')}
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Analysis Results */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('catalogue.analysisResults')}
                  </h3>
                  
                  {!analysisResult && !isAnalyzing && (
                    <div className={`p-8 rounded-xl text-center ${
                      isDark ? 'bg-[#212121]' : 'bg-gray-50'
                    }`}>
                      <Calculator size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t('catalogue.uploadToAnalyze')}
                      </p>
                    </div>
                  )}
                  
                  {isAnalyzing && (
                    <div className={`p-8 rounded-xl text-center ${
                      isDark ? 'bg-[#212121]' : 'bg-gray-50'
                    }`}>
                      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('catalogue.analyzingFloorPlan')}
                      </p>
                      <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t('catalogue.identifyingProducts')}
                      </p>
                    </div>
                  )}
                  
                  {analysisResult && (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl ${
                        isDark ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle size={20} className="text-green-600" />
                          <span className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                            {t('catalogue.analysisComplete')}
                          </span>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-600'}`}>
                          {t('catalogue.detectedProducts', { count: analysisResult.detectedProducts.length })}
                        </p>
                      </div>
                      
                      <div className={`p-4 rounded-xl ${
                        isDark ? 'bg-[#212121]' : 'bg-gray-50'
                      }`}>
                        <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t('catalogue.detectedItems')}
                        </h4>
                        <div className="space-y-3">
                          {analysisResult.detectedProducts.map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {item.product.name}
                                  </p>
                                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {t('catalogue.quantity')}: {item.quantity} | {t('catalogue.confidence')}: {item.confidence}%
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {formatPrice(item.product.price * item.quantity, item.product.currency)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className={`mt-4 pt-4 border-t ${
                          isDark ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {t('catalogue.totalEstimate')}:
                            </span>
                            <span className={`text-xl font-bold text-blue-600`}>
                              {formatPrice(analysisResult.totalCost, '฿')}
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={generateQuotation}
                          className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <Calculator size={20} />
                          {t('catalogue.generateQuotation')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyCataloguePage;