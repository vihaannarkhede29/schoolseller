import React from 'react';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../utils/dataManager';

const OrderCard = ({ order, showActions = false, onUpdate }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const handleStatusUpdate = (newStatus) => {
    if (onUpdate) {
      onUpdate(order.id, { status: newStatus });
    }
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="font-medium text-gray-900">{order.buyerName}</span>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(order.status)}
          <span className={`status-badge ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-3">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-700">
              {item.quantity}x {item.name}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Order Total */}
      <div className="border-t border-gray-200 pt-3 mb-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total:</span>
          <span className="font-bold text-lg text-gray-900">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>
      </div>

      {/* Order Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <div>Ordered: {formatDateTime(order.createdAt)}</div>
        {order.confirmedAt && (
          <div>Confirmed: {formatDateTime(order.confirmedAt)}</div>
        )}
        <div>Type: {order.type === 'reservation' ? 'Reservation' : 'Order'}</div>
      </div>

      {/* Actions */}
      {showActions && order.status === 'pending' && (
        <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={() => handleStatusUpdate('confirmed')}
            className="btn btn-success text-sm py-2 px-3"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve
          </button>
          <button
            onClick={() => handleStatusUpdate('cancelled')}
            className="btn btn-danger text-sm py-2 px-3"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Reject
          </button>
        </div>
      )}

      {showActions && order.status === 'confirmed' && (
        <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={() => handleStatusUpdate('completed')}
            className="btn btn-primary text-sm py-2 px-3"
          >
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;

