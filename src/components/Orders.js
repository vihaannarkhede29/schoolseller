import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import { 
  getOrdersByBuyer, 
  getOrdersBySeller, 
  updateOrder, 
  formatCurrency, 
  formatDateTime 
} from '../utils/dataManager';
import OrderCard from './OrderCard';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const userOrders = user.role === 'seller' 
      ? getOrdersBySeller(user.id)
      : getOrdersByBuyer(user.id);
    
    setOrders(userOrders);
    setLoading(false);
  };

  const handleOrderUpdate = (orderId, updates) => {
    updateOrder(orderId, updates);
    loadOrders(); // Reload orders after update
  };

  const filteredOrders = orders.filter(order => {
    switch (filter) {
      case 'pending':
        return order.status === 'pending';
      case 'confirmed':
        return order.status === 'confirmed';
      case 'completed':
        return order.status === 'completed';
      case 'cancelled':
        return order.status === 'cancelled';
      default:
        return true;
    }
  });

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === 'seller' ? 'Order Management' : 'My Orders'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user.role === 'seller' 
              ? 'Manage incoming orders and reservations'
              : 'Track your orders and reservations'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {[
              { key: 'all', label: 'All Orders', count: stats.total },
              { key: 'pending', label: 'Pending', count: stats.pending },
              { key: 'confirmed', label: 'Confirmed', count: stats.confirmed },
              { key: 'completed', label: 'Completed', count: stats.completed },
              { key: 'cancelled', label: 'Cancelled', count: stats.cancelled }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  filter === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    filter === tab.key
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="card text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? user.role === 'seller' 
                  ? 'Orders will appear here when customers make reservations'
                  : 'Your orders and reservations will appear here'
                : `No orders with ${filter} status`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdate={handleOrderUpdate}
                showActions={user.role === 'seller'}
              />
            ))}
          </div>
        )}

        {/* Order Summary for Sellers */}
        {user.role === 'seller' && orders.length > 0 && (
          <div className="mt-8 card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Total Revenue</h4>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    orders
                      .filter(o => o.status === 'confirmed' || o.status === 'completed')
                      .reduce((sum, order) => sum + order.totalAmount, 0)
                  )}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Average Order Value</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(
                    orders.length > 0 
                      ? orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length
                      : 0
                  )}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Completion Rate</h4>
                <p className="text-2xl font-bold text-purple-600">
                  {orders.length > 0 
                    ? Math.round((stats.completed / orders.length) * 100)
                    : 0
                  }%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

