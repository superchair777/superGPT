import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Users,
  Phone,
  Mail,
  Building,
  Calendar,
  DollarSign,
  Eye,
  ChevronDown,
  Star,
  TrendingUp,
  TrendingDown,
  X,
  User,
  MapPin,
  Clock,
  ShoppingBag,
  BarChart3
} from 'lucide-react';

const ClientsListPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    minSpending: '',
    maxSpending: '',
    status: 'all',
    joinDateFrom: '',
    joinDateTo: ''
  });

  const categories = [
    { id: 'all', name: t('clients.allClients'), count: 24 },
    { id: 'active', name: t('clients.activeClients'), count: 18 },
    { id: 'inactive', name: t('clients.inactiveClients'), count: 4 },
    { id: 'vip', name: t('clients.vipClients'), count: 6 },
    { id: 'new', name: t('clients.newClients'), count: 3 },
  ];

  const clients = [
    {
      id: 1,
      name: 'Somchai Jaidee',
      company: 'Bangkok Office Solutions Co., Ltd.',
      position: 'Procurement Manager',
      email: 'somchai@bangkokoffice.com',
      phone: '+66 2 123 4567',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'active',
      totalSpent: 485000,
      totalOrders: 12,
      averageOrderValue: 40417,
      lastPurchaseDate: '2024-01-15',
      joinDate: '2022-03-10',
      address: 'Bangkok, Thailand',
      purchaseHistory: [
        { id: 1, date: '2024-01-15', value: 125000, status: 'completed', items: 'Executive Chairs x8, Conference Table x1' },
        { id: 2, date: '2023-12-08', value: 89000, status: 'completed', items: 'Storage Cabinets x6, Desks x4' },
        { id: 3, date: '2023-11-22', value: 156000, status: 'completed', items: 'Complete Office Setup' },
        { id: 4, date: '2023-10-05', value: 67000, status: 'completed', items: 'Meeting Room Furniture' },
        { id: 5, date: '2023-09-18', value: 48000, status: 'completed', items: 'Task Chairs x12' }
      ]
    },
    {
      id: 2,
      name: 'Niran Techaporn',
      company: 'Digital Innovation Hub',
      position: 'Office Manager',
      email: 'niran@digitalhub.co.th',
      phone: '+66 2 987 6543',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'vip',
      totalSpent: 750000,
      totalOrders: 18,
      averageOrderValue: 41667,
      lastPurchaseDate: '2024-01-20',
      joinDate: '2021-08-15',
      address: 'Chiang Mai, Thailand',
      purchaseHistory: [
        { id: 1, date: '2024-01-20', value: 95000, status: 'completed', items: 'Ergonomic Workstations x10' },
        { id: 2, date: '2024-01-05', value: 145000, status: 'completed', items: 'Executive Office Suite' },
        { id: 3, date: '2023-12-15', value: 78000, status: 'completed', items: 'Conference Room Setup' }
      ]
    },
    {
      id: 3,
      name: 'Pranee Suksawat',
      company: 'Green Energy Solutions',
      position: 'Facilities Director',
      email: 'pranee@greenenergy.th',
      phone: '+66 2 555 0123',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'active',
      totalSpent: 320000,
      totalOrders: 8,
      averageOrderValue: 40000,
      lastPurchaseDate: '2024-01-10',
      joinDate: '2023-01-20',
      address: 'Phuket, Thailand',
      purchaseHistory: [
        { id: 1, date: '2024-01-10', value: 85000, status: 'completed', items: 'Sustainable Office Furniture' },
        { id: 2, date: '2023-11-28', value: 120000, status: 'completed', items: 'Open Office Layout' }
      ]
    },
    {
      id: 4,
      name: 'Kamon Rattanakul',
      company: 'Tech Startup Incubator',
      position: 'Operations Lead',
      email: 'kamon@techincubator.com',
      phone: '+66 2 777 8888',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'new',
      totalSpent: 125000,
      totalOrders: 3,
      averageOrderValue: 41667,
      lastPurchaseDate: '2024-01-18',
      joinDate: '2023-12-01',
      address: 'Bangkok, Thailand',
      purchaseHistory: [
        { id: 1, date: '2024-01-18', value: 65000, status: 'completed', items: 'Startup Office Package' },
        { id: 2, date: '2024-01-02', value: 35000, status: 'pending', items: 'Additional Workstations' }
      ]
    },
    {
      id: 5,
      name: 'Siriporn Wongchai',
      company: 'Financial Advisory Group',
      position: 'Senior Partner',
      email: 'siriporn@finadvice.co.th',
      phone: '+66 2 333 4444',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'vip',
      totalSpent: 890000,
      totalOrders: 15,
      averageOrderValue: 59333,
      lastPurchaseDate: '2024-01-12',
      joinDate: '2020-05-10',
      address: 'Bangkok, Thailand',
      purchaseHistory: [
        { id: 1, date: '2024-01-12', value: 180000, status: 'completed', items: 'Luxury Executive Suite' },
        { id: 2, date: '2023-12-20', value: 95000, status: 'completed', items: 'Client Meeting Area' }
      ]
    },
    {
      id: 6,
      name: 'Thanakit Somboon',
      company: 'Manufacturing Excellence Ltd.',
      position: 'Plant Manager',
      email: 'thanakit@manufacturing.th',
      phone: '+66 2 666 7777',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'inactive',
      totalSpent: 245000,
      totalOrders: 6,
      averageOrderValue: 40833,
      lastPurchaseDate: '2023-08-15',
      joinDate: '2022-11-05',
      address: 'Rayong, Thailand',
      purchaseHistory: [
        { id: 1, date: '2023-08-15', value: 75000, status: 'completed', items: 'Office Administration Setup' },
        { id: 2, date: '2023-06-10', value: 110000, status: 'completed', items: 'Management Office Furniture' }
      ]
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesCategory = selectedCategory === 'all' || client.status === selectedCategory;
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Advanced filters
    const matchesSpending = (!filters.minSpending || client.totalSpent >= parseInt(filters.minSpending)) &&
                           (!filters.maxSpending || client.totalSpent <= parseInt(filters.maxSpending));
    const matchesStatus = filters.status === 'all' || client.status === filters.status;
    const matchesJoinDate = (!filters.joinDateFrom || new Date(client.joinDate) >= new Date(filters.joinDateFrom)) &&
                           (!filters.joinDateTo || new Date(client.joinDate) <= new Date(filters.joinDateTo));
    
    return matchesCategory && matchesSearch && matchesSpending && matchesStatus && matchesJoinDate;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'spending-high':
        return b.totalSpent - a.totalSpent;
      case 'spending-low':
        return a.totalSpent - b.totalSpent;
      case 'last-purchase':
        return new Date(b.lastPurchaseDate).getTime() - new Date(a.lastPurchaseDate).getTime();
      case 'join-date':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const formatPrice = (price: number) => {
    return `฿${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'vip':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'new':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const clearFilters = () => {
    setFilters({
      minSpending: '',
      maxSpending: '',
      status: 'all',
      joinDateFrom: '',
      joinDateTo: ''
    });
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
              <Users size={28} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('clients.clientsManagement')}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('clients.manageClientRelationships')}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${
              isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
            }`}>
              {sortedClients.length} {t('clients.clients')}
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
              placeholder={t('clients.searchClients')}
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
              <option value="name">{t('clients.sortByName')}</option>
              <option value="spending-high">{t('clients.sortBySpendingHigh')}</option>
              <option value="spending-low">{t('clients.sortBySpendingLow')}</option>
              <option value="last-purchase">{t('clients.sortByLastPurchase')}</option>
              <option value="join-date">{t('clients.sortByJoinDate')}</option>
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
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  showAdvancedFilters
                    ? 'bg-purple-600 text-white'
                    : isDark
                      ? 'bg-[#2f2f2f] hover:bg-gray-600 text-gray-300 border border-gray-600'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                }`}
              >
                Advanced Filters
              </button>
            </div>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className={`p-4 rounded-lg border mb-6 ${
            isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('clients.filterBySpending')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder={t('clients.minSpending')}
                    value={filters.minSpending}
                    onChange={(e) => setFilters({...filters, minSpending: e.target.value})}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <input
                    type="number"
                    placeholder={t('clients.maxSpending')}
                    value={filters.maxSpending}
                    onChange={(e) => setFilters({...filters, maxSpending: e.target.value})}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('clients.filterByStatus')}
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDark 
                      ? 'bg-[#212121] border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">{t('clients.allClients')}</option>
                  <option value="active">{t('clients.active')}</option>
                  <option value="inactive">{t('clients.inactive')}</option>
                  <option value="vip">{t('clients.vip')}</option>
                  <option value="new">{t('clients.new')}</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('clients.filterByJoinDate')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={filters.joinDateFrom}
                    onChange={(e) => setFilters({...filters, joinDateFrom: e.target.value})}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <input
                    type="date"
                    value={filters.joinDateTo}
                    onChange={(e) => setFilters({...filters, joinDateTo: e.target.value})}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-end gap-2">
                <button
                  onClick={clearFilters}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {t('clients.clearFilters')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clients List */}
        <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedClients.map((client) => (
                <div
                  key={client.id}
                  className={`group rounded-xl border transition-all duration-300 hover:shadow-xl cursor-pointer ${
                    isDark 
                      ? 'bg-[#2f2f2f] border-gray-600 hover:border-gray-500' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={client.avatar} 
                        alt={client.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-lg truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {client.name}
                        </h3>
                        <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {client.position}
                        </p>
                        <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {client.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(client.status)}`}>
                        {t(`clients.${client.status}`)}
                      </span>
                      {client.status === 'vip' && (
                        <Star size={16} className="text-yellow-400 fill-current" />
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {t('clients.totalSpent')}:
                        </span>
                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatPrice(client.totalSpent)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {t('clients.lastPurchase')}:
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {formatDate(client.lastPurchaseDate)}
                        </span>
                      </div>
                    </div>
                    
                    <button className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}>
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedClients.map((client) => (
                <div
                  key={client.id}
                  className={`flex items-center gap-6 p-6 rounded-xl border transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-[#2f2f2f] border-gray-600 hover:bg-gray-600' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedClient(client)}
                >
                  <img 
                    src={client.avatar} 
                    alt={client.name} 
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0" 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-semibold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {client.name}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {client.position} at {client.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(client.status)}`}>
                          {t(`clients.${client.status}`)}
                        </span>
                        {client.status === 'vip' && (
                          <Star size={16} className="text-yellow-400 fill-current" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('clients.totalSpent')}
                          </span>
                        </div>
                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatPrice(client.totalSpent)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <ShoppingBag size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('clients.totalOrders')}
                          </span>
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {client.totalOrders}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('clients.lastPurchase')}
                          </span>
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {formatDate(client.lastPurchaseDate)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Mail size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('clients.email')}
                          </span>
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                          {client.email}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Phone size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {client.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {client.address}
                          </span>
                        </div>
                      </div>
                      
                      <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}>
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {sortedClients.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('clients.noClientsFound')}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('clients.tryDifferentSearch')}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Client Detail Modal */}
      {selectedClient && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedClient(null)}
        >
          <div 
            className={`rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden ${
              isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex justify-between items-center p-6 border-b ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-4">
                <img 
                  src={selectedClient.avatar} 
                  alt={selectedClient.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedClient.name}
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedClient.position} at {selectedClient.company}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(selectedClient.status)}`}>
                      {t(`clients.${selectedClient.status}`)}
                    </span>
                    {selectedClient.status === 'vip' && (
                      <Star size={16} className="text-yellow-400 fill-current" />
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedClient(null)} 
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Client Information */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Contact Information */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-[#212121]' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('clients.contactInfo')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedClient.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedClient.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedClient.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedClient.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {t('clients.clientSince')}: {formatDate(selectedClient.joinDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Statistics */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-[#212121]' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('clients.purchaseStats')}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {t('clients.totalSpent')}
                          </span>
                          <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {formatPrice(selectedClient.totalSpent)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {t('clients.totalOrders')}
                          </span>
                          <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {selectedClient.totalOrders}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {t('clients.averageOrderValue')}
                          </span>
                          <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {formatPrice(selectedClient.averageOrderValue)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {t('clients.lastOrderDate')}
                          </span>
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {formatDate(selectedClient.lastPurchaseDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase History */}
                <div className="lg:col-span-2">
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('clients.purchaseHistory')}
                  </h3>
                  <div className="space-y-4">
                    {selectedClient.purchaseHistory.map((order) => (
                      <div
                        key={order.id}
                        className={`p-4 rounded-xl border ${
                          isDark ? 'bg-[#212121] border-gray-600' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-600' : 'bg-blue-100'}`}>
                              <ShoppingBag size={16} className={isDark ? 'text-white' : 'text-blue-600'} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  Order #{order.id}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getOrderStatusColor(order.status)}`}>
                                  {t(`clients.${order.status}`)}
                                </span>
                              </div>
                              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {formatDate(order.date)}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {formatPrice(order.value)}
                            </div>
                            <button className={`text-sm text-blue-600 hover:text-blue-700 transition-colors`}>
                              {t('clients.viewOrder')}
                            </button>
                          </div>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {order.items}
                        </p>
                      </div>
                    ))}
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

export default ClientsListPage;