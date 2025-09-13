import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Package, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Share2,
  Instagram,
  Twitter,
  Facebook,
  Copy,
  Eye,
  Edit,
  Trash2,
  Star,
  Users,
  ArrowRight
} from 'lucide-react';
import { 
  getItemsBySeller, 
  getOrdersBySeller, 
  getSellerStats, 
  getSettings, 
  updateSettings,
  formatCurrency,
  formatDate
} from '../utils/dataManager';
import ItemCard from './ItemCard';
import OrderCard from './OrderCard';
import SalesChart from './SalesChart';

const SellerDashboard = ({ user }) => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [settings, setSettings] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [timeFilter, setTimeFilter] = useState('week'); // day, week, month

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Use user.uid instead of user.id for Firebase compatibility
      const userId = user.uid || user.id;
      const [sellerItems, sellerOrders, sellerStats, appSettings] = await Promise.all([
        getItemsBySeller(userId),
        getOrdersBySeller(userId),
        getSellerStats(userId),
        getSettings()
      ]);

      setItems(sellerItems);
      setOrders(sellerOrders);
      setStats(sellerStats);
      setSettings(appSettings);
      setShareUrl(`${window.location.origin}/seller/${userId}`);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const getFilteredStats = () => {
    // Return realistic stats for new users
    const baseStats = {
      sales: stats.totalSales || 0,
      itemsSold: stats.totalItemsSold || 0,
      revenue: stats.totalRevenue || 0
    };

    return baseStats;
  };

  const handleToggleApproval = () => {
    const newSettings = updateSettings({ requireApproval: !settings.requireApproval });
    setSettings(newSettings);
  };

  const handleOrderUpdate = (orderId, updates) => {
    // This would typically update the order in the data manager
    // For now, we'll just reload the data
    loadData();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const generateSocialPost = (platform) => {
    const message = `Check out my items on SchoolSeller! I have ${stats.totalItems} items available. ${shareUrl}`;
    
    let url = '';
    switch (platform) {
      case 'instagram':
        // Instagram doesn't support direct URL posting, so we'll copy the text
        copyToClipboard(message);
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
        break;
      default:
        break;
    }
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const confirmedOrders = orders.filter(order => order.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, {user.displayName || user.name}!</p>
                  </div>
                </div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="ml-2 text-sm font-medium text-green-900">0 customers</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-purple-600" />
                      <span className="ml-2 text-sm font-medium text-purple-900">{items.length} items</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mt-6 lg:mt-0">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Store
                </button>
                <Link
                  to="/add-item"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(getFilteredStats().revenue)}</p>
              </div>
            </div>
          </div>

          {/* Sales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">{getFilteredStats().sales}</p>
              </div>
            </div>
          </div>

          {/* Items Sold */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">Items Sold</p>
                <p className="text-2xl font-semibold text-gray-900">{getFilteredStats().itemsSold}</p>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">Inventory</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalItems || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sales Analytics</h2>
              <p className="text-gray-600">Track your performance and growth trends</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 lg:mt-0">
              <span className="text-sm font-medium text-gray-700">Time Period:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setTimeFilter('day')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeFilter === 'day' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setTimeFilter('week')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeFilter === 'week' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeFilter('month')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeFilter === 'month' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 bg-gray-50 rounded-lg p-6">
            <SalesChart sellerId={user.uid || user.id} period={timeFilter} />
          </div>
        </div>

        {/* Quick Actions & Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Pending Orders Card */}
          <div className="group bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders || 0}</p>
                <p className="text-sm text-yellow-600 font-medium">Awaiting</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Pending Orders</h3>
            <p className="text-sm text-gray-600">Orders needing your attention</p>
          </div>

          {/* Reservations Card */}
          <div className="group bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{stats.activeReservations || 0}</p>
                <p className="text-sm text-cyan-600 font-medium">Active</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Reservations</h3>
            <p className="text-sm text-gray-600">Items reserved by customers</p>
          </div>

          {/* Quick Actions Card */}
          <div className="group bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/add-item"
                  className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Add New Item</span>
                </Link>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 w-full"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="font-medium">Share Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Toggle */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order Approval</h3>
              <p className="text-sm text-gray-600">
                {settings.requireApproval 
                  ? 'Orders require your approval before confirmation'
                  : 'Orders are automatically confirmed'
                }
              </p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.requireApproval}
                onChange={handleToggleApproval}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inventory Section */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Items</h2>
                  <p className="text-gray-600">Manage your inventory</p>
                </div>
              </div>
              <Link
                to="/add-item"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </Link>
            </div>
            
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Package className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No items yet</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">Start building your store by adding your first item to sell</p>
                <Link 
                  to="/add-item" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Item
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.slice(0, 3).map((item, index) => (
                  <div key={item.id} className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 hover:shadow-lg animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:shadow-lg transition-all duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{item.category}</p>
                      <p className="text-lg font-bold text-blue-600">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/item/${item.id}`}
                        className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-300"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/edit-item/${item.id}`}
                        className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded-xl transition-all duration-300"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                ))}
                {items.length > 3 && (
                  <Link
                    to="/seller-dashboard"
                    className="block text-center text-blue-600 hover:text-blue-700 font-semibold py-4 border-t border-gray-200 hover:bg-blue-50 rounded-2xl transition-all duration-300"
                  >
                    View all {items.length} items →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                  <p className="text-gray-600">Customer reservations</p>
                </div>
              </div>
              <Link
                to="/orders"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No orders yet</h3>
                <p className="text-gray-600 max-w-sm mx-auto">Orders will appear here when customers make reservations for your items</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order, index) => (
                  <div key={order.id} className="group p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:from-green-50 hover:to-emerald-50 transition-all duration-300 hover:shadow-lg animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-md">
                          <span className="text-lg font-bold text-white">
                            {order.buyerName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 text-lg">{order.buyerName}</span>
                          <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 text-sm rounded-2xl font-semibold ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-4">
                      <p className="font-medium mb-2">Items:</p>
                      <p className="text-sm">{order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </span>
                      <div className="flex items-center space-x-2">
                        {order.status === 'pending' && (
                          <>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105">
                              Approve
                            </button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105">
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {orders.length > 3 && (
                  <Link
                    to="/orders"
                    className="block text-center text-green-600 hover:text-green-700 font-semibold py-4 border-t border-gray-200 hover:bg-green-50 rounded-2xl transition-all duration-300"
                  >
                    View all {orders.length} orders →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Store</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Link:
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="form-input rounded-r-none"
                  />
                  <button
                    onClick={() => copyToClipboard(shareUrl)}
                    className="btn btn-outline rounded-l-none border-l-0"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="social-share">
                <button
                  onClick={() => generateSocialPost('instagram')}
                  className="social-btn instagram flex items-center space-x-2"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </button>
                <button
                  onClick={() => generateSocialPost('twitter')}
                  className="social-btn twitter flex items-center space-x-2"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => generateSocialPost('facebook')}
                  className="social-btn facebook flex items-center space-x-2"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </button>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
