import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
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
  X
} from 'lucide-react';

const CompanyCataloguePage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

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
      image: '/placeholder1.svg',
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
      image: '/placeholder2.svg',
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
      image: '/placeholder3.svg',
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
      image: '/placeholder4.svg',
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
      image: '/placeholder1.svg',
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
      image: '/placeholder2.svg',
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
                        {t('catalogue.addToCart')}
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
                          {t('catalogue.addToCart')}
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
                      {selectedProduct.inStock ? t('catalogue.addToCart') : t('catalogue.outOfStock')}
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
    </div>
  );
};

export default CompanyCataloguePage;