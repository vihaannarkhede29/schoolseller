import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { getItemById, formatCurrency } from '../utils/dataManager';

const ItemDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        const itemData = await getItemById(id);
        if (itemData) {
          setItem(itemData);
        } else {
          navigate('/buyer-dashboard');
        }
      } catch (error) {
        console.error('Error loading item:', error);
        navigate('/buyer-dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    loadItem();
  }, [id, navigate]);

  const handleReserve = async () => {
    if (!user) {
      alert('Please sign in to reserve items');
      return;
    }

    if (user.role !== 'buyer') {
      alert('Only buyers can reserve items');
      return;
    }

    if (item.quantity < quantity) {
      alert('Not enough items in stock');
      return;
    }

    try {
      // Create order object
      const order = {
        itemId: item.id,
        itemName: item.name,
        itemPrice: item.price,
        itemImage: item.image,
        sellerId: item.sellerId,
        sellerName: item.sellerName,
        buyerId: user.uid,
        buyerName: user.displayName || user.email || 'Unknown Buyer',
        quantity: quantity,
        totalPrice: item.price * quantity,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Import addOrder from dataManager
      const { addOrder } = await import('../utils/dataManager');
      
      // Save order to Firestore
      await addOrder(order);

      alert(`Successfully reserved ${quantity} ${item.name}(s)! The seller will contact you to arrange pickup and payment.`);
      navigate('/buyer-dashboard');
    } catch (error) {
      console.error('Error reserving item:', error);
      alert('Failed to reserve item. Please try again.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this ${item.name} on SchoolSeller!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <button
            onClick={() => navigate('/buyer-dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(user.role === 'seller' ? '/seller-dashboard' : '/buyer-dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to {user.role === 'seller' ? 'Dashboard' : 'Browse'}
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item Image */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                  <p className="text-gray-600">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(item.price)}
                  </p>
                  <p className="text-sm text-gray-500">per item</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Available Quantity</p>
                  <p className="text-lg font-semibold text-gray-900">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seller</p>
                  <p className="text-lg font-semibold text-gray-900">{item.sellerName}</p>
                </div>
              </div>

              {user.role === 'buyer' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Array.from({ length: Math.min(item.quantity, 10) }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleReserve}
                      disabled={item.quantity === 0}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>
                        {item.quantity === 0 ? 'Out of Stock' : `Reserve ${quantity} Item${quantity > 1 ? 's' : ''}`}
                      </span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. Click "Reserve" to request this item</li>
                      <li>2. The seller will review your request</li>
                      <li>3. If approved, arrange to meet and pay in cash</li>
                      <li>4. Complete the transaction in person</li>
                    </ol>
                  </div>
                </div>
              )}

              {user.role === 'seller' && user.id === item.sellerId && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/edit-item/${item.id}`)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Item
                  </button>
                  <button
                    onClick={() => navigate('/seller-dashboard')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;


