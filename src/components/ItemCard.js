import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import { formatCurrency } from '../utils/dataManager';

const ItemCard = ({ item, showActions = false, onEdit, onDelete }) => {
  return (
    <div className="card card-hover">
      <div className="flex">
        {/* Item Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="item-image-small"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
            }}
          />
        </div>

        {/* Item Details */}
        <div className="ml-4 flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{item.category}</p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
            </div>
            <div className="ml-4 text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(item.price)}
              </p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Link
                  to={`/item/${item.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </Link>
                <button
                  onClick={() => onEdit && onEdit(item)}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDelete && onDelete(item)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
              
              {/* Status Badge */}
              <span className={`status-badge ${
                item.status === 'active' ? 'status-confirmed' : 'status-pending'
              }`}>
                {item.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

