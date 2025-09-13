import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { addItem } from '../utils/dataManager';

const AddItem = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Snacks',
    'Beverages',
    'School Supplies',
    'Accessories',
    'Electronics',
    'Books',
    'Clothing',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newItem = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        sellerId: user.uid || user.id,
        sellerName: user.displayName || user.name,
        image: formData.image || 'https://via.placeholder.com/300x200?text=No+Image'
      };

      addItem(newItem);
      
      // Show success message (you could add a toast notification here)
      alert('Item added successfully!');
      
      // Navigate back to seller dashboard
      navigate('/seller-dashboard');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just use a placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Add New Item
          </h1>
          <p className="text-gray-600 mt-2">Create a listing that stands out from the crowd</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 p-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Upload className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Create Your Listing</h2>
                  <p className="text-indigo-100 mt-1">Fill in the details below to add your item</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Item Image Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <label className="text-lg font-semibold text-gray-800">Item Image</label>
                  <span className="text-sm text-gray-500">(Optional but recommended)</span>
                </div>
                
                <div className="relative">
                  {formData.image ? (
                    <div className="relative group">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => document.getElementById('image-upload').click()}
                          className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-800 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-white"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => document.getElementById('image-upload').click()}
                      className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-8 w-8 text-indigo-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload an Image</h3>
                      <p className="text-gray-500 mb-4">Click to browse or drag and drop</p>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
                        Choose File
                      </div>
                    </div>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Item Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Item Name */}
                <div className="space-y-3">
                  <label htmlFor="name" className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-gray-800">Item Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 border-2 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
                      errors.name 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                        : 'border-gray-200 bg-gray-50 focus:border-indigo-400 focus:bg-white'
                    }`}
                    placeholder="e.g., Hot Cheetos, Pencils, Notebook"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <label htmlFor="category" className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-gray-800">Category</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 border-2 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
                      errors.category 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                        : 'border-gray-200 bg-gray-50 focus:border-purple-400 focus:bg-white'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.category}</span>
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-3">
                  <label htmlFor="price" className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-gray-800">Price</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                        errors.price 
                          ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                          : 'border-gray-200 bg-gray-50 focus:border-green-400 focus:bg-white'
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-sm flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.price}</span>
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-3">
                  <label htmlFor="quantity" className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-gray-800">Quantity</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-4 border-2 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-100 ${
                      errors.quantity 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                        : 'border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white'
                    }`}
                    placeholder="1"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.quantity}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label htmlFor="description" className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                  <span className="text-lg font-semibold text-gray-800">Description</span>
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-4 border-2 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-100 resize-none ${
                    errors.description 
                      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                      : 'border-gray-200 bg-gray-50 focus:border-cyan-400 focus:bg-white'
                  }`}
                  placeholder="Describe your item in detail... What makes it special? What condition is it in? Any additional information buyers should know?"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-6 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/seller-dashboard')}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Item...</span>
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      <span>Add Item</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;

