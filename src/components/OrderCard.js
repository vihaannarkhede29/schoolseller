import React from 'react';
import { Clock, CheckCircle, XCircle, Package, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/dataManager';

const OrderCard = ({ order, showActions = false, onUpdate }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    if (onUpdate) {
      try {
        await onUpdate(order.id, { status: newStatus });
      } catch (error) {
        console.error('Error updating order status:', error);
        alert('Failed to update order status. Please try again.');
      }
    }
  };

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon(order.status)}
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {formatDate(order.createdAt)}
        </span>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold text-gray-900 mb-1">
          {order.itemName || order.items?.[0]?.name || 'Unknown Item'}
        </h4>
        <p className="text-sm text-gray-600">
          {order.sellerName ? `by ${order.sellerName}` : 'Unknown Seller'}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900">
          {formatCurrency(order.totalAmount || order.totalPrice || order.itemPrice || 0)}
        </div>
        <div className="text-sm text-gray-500">
          Qty: {order.quantity || 1}
        </div>
      </div>

      {/* Seller Actions */}
      {showActions && order.status === 'pending' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Manage this order:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusUpdate('confirmed')}
                className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleStatusUpdate('cancelled')}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
              >
                <ThumbsDown className="h-4 w-4" />
                <span>Deny</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;