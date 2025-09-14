import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Package, User, Mail, Share2, Instagram, Twitter, Facebook, Copy, CheckCircle } from 'lucide-react';
import { getItemsBySeller, getUserById, formatCurrency } from '../utils/dataManager';

const SellerStoreView = ({ user }) => {
  const { userId } = useParams();
  const [seller, setSeller] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadSellerData();
  }, [userId]);

  const loadSellerData = async () => {
    try {
      setLoading(true);
      const [sellerData, sellerItems] = await Promise.all([
        getUserById(userId),
        getItemsBySeller(userId)
      ]);
      
      setSeller(sellerData);
      setItems(sellerItems.filter(item => item.status === 'active'));
    } catch (error) {
      console.error('Error loading seller data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const generateSocialPost = (platform) => {
    const message = `Check out my items on SchoolSeller! I have ${items.length} items available. ${window.location.href}`;
    
    switch (platform) {
      case 'instagram':
        copyToClipboard(message);
        break;
      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        window.open(twitterUrl, '_blank');
        break;
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(facebookUrl, '_blank');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading store...</p>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h2>
          <p className="text-gray-600">This seller's store could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Store Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {seller.name?.charAt(0)?.toUpperCase() || 'S'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{seller.name || 'Unknown Seller'}</h1>
                <p className="text-gray-600 mt-1">Student Store</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Package className="h-4 w-4 mr-1" />
                    {items.length} items
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {seller.email || 'No contact info'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => copyToClipboard(window.location.href)}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors ${
                  copied ? 'bg-green-500 text-white border-green-500' : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </button>
              <button
                onClick={() => generateSocialPost('instagram')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </button>
              <button
                onClick={() => generateSocialPost('twitter')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </button>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Items</h2>
            <span className="text-gray-600">{items.length} items available</span>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items available</h3>
              <p className="text-gray-600">This seller hasn't added any items yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.quantity > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Seller</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <span>{seller.email || 'No email provided'}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Contact the seller directly to arrange pickup and payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerStoreView;