import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { getItems, getOrdersByBuyer, formatCurrency } from '../utils/dataManager';
import ItemCard from './ItemCard';
import OrderCard from './OrderCard';

const BuyerDashboard = ({ user }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterAndSortItems();
  }, [items, searchTerm, selectedCategory, sortBy]);

  const loadData = async () => {
    try {
      const allItems = await getItems();
      const activeItems = allItems.filter(item => item.status === 'active');
      const buyerOrders = await getOrdersByBuyer(user.uid || user.id);
      
      setItems(activeItems);
      setOrders(buyerOrders);
    } catch (error) {
      console.error('Error loading data:', error);
      setItems([]);
      setOrders([]);
    }
  };

  const filterAndSortItems = () => {
    let filtered = items;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  };

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const handleReserveItem = async (item) => {
    try {
      // Create a reservation/order
      const order = {
        itemId: item.id,
        itemName: item.name,
        itemPrice: item.price,
        quantity: 1,
        totalAmount: item.price,
        sellerId: item.sellerId,
        sellerName: item.sellerName,
        buyerId: user.uid || user.id,
        buyerName: user.displayName || user.name || 'Unknown Buyer',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Add order to Firestore
      const { addOrder, updateItem } = await import('../utils/dataManager');
      
      await addOrder(order);
      
      // Update local state
      const newOrder = { id: Date.now().toString(), ...order };
      setOrders(prev => [...prev, newOrder]);
      
      // Update item quantity
      await updateItem(item.id, {
        quantity: item.quantity - 1
      });
      
      // Reload items to reflect quantity change
      loadData();
      
      alert(`Successfully reserved ${item.name}! The seller will review your request.`);
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Error creating reservation. Please try again.');
    }
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const confirmedOrders = orders.filter(order => order.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Items</h1>
          <p className="text-gray-600 mt-1">Find snacks, supplies, and more from your fellow students</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Available Items ({filteredItems.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Filtered results</span>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="card text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || selectedCategory !== 'all' ? 'No items found' : 'No items available'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Check back later for new items from sellers'
                  }
                </p>
                {(searchTerm || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="btn btn-primary"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="card card-hover">
                    <div className="mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image w-full"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <span className="text-lg font-bold text-blue-600">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-gray-500">
                          by {item.sellerName}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReserveItem(item)}
                        className="btn btn-primary flex-1"
                        disabled={item.quantity === 0}
                      >
                        {item.quantity === 0 ? 'Out of Stock' : 'Reserve Item'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders Sidebar */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>
            
            {orders.length === 0 ? (
              <div className="card text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600">Your reservations and orders will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Pending Orders */}
                {pendingOrders.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Pending ({pendingOrders.length})
                    </h3>
                    <div className="space-y-3">
                      {pendingOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirmed Orders */}
                {confirmedOrders.length > 0 && (
                  <div className={pendingOrders.length > 0 ? 'mt-6' : ''}>
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirmed ({confirmedOrders.length})
                    </h3>
                    <div className="space-y-3">
                      {confirmedOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

