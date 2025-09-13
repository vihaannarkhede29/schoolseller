import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, User, Package } from 'lucide-react';
import { getItemsBySeller, formatCurrency, formatDate } from '../utils/dataManager';
import ItemCard from './ItemCard';

const SellerStoreView = ({ user }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [sellerItems, setSellerItems] = useState([]);
  const [sellerName, setSellerName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSellerData();
  }, [userId]);

  const loadSellerData = () => {
    try {
      const items = getItemsBySeller(userId);
      setSellerItems(items);
      
      // Get seller name from first item or use placeholder
      if (items.length > 0) {
        setSellerName(items[0].sellerName || 'Unknown Seller');
      } else {
        setSellerName('Unknown Seller');
      }
    } catch (error) {
      console.error('Error loading seller data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{sellerName}'s Store</h1>
                  <p className="text-sm text-gray-600">{sellerItems.length} items available</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/buyer-dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Browse All Items</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {sellerItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Items Available</h3>
            <p className="text-gray-600">This seller hasn't listed any items yet.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Items from {sellerName}</h2>
              <p className="text-gray-600">Browse and reserve items from this seller</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sellerItems.map((item) => (
                <ItemCard key={item.id} item={item} user={user} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerStoreView;
