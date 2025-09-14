import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Package, ShoppingCart, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';

const SellerTutorial = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const tutorialSteps = [
    {
      id: 'welcome',
      title: 'Welcome to SchoolSeller!',
      description: 'Let\'s quickly walk through your seller dashboard to help you get started.',
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      position: 'center'
    },
    {
      id: 'add-products',
      title: 'Add Your Products',
      description: 'Click the "Add Item" button to list your snacks, supplies, or other items. Add photos, descriptions, and set your prices.',
      icon: <Package className="h-8 w-8 text-blue-600" />,
      position: 'top-right',
      target: 'add-item-button'
    },
    {
      id: 'track-orders',
      title: 'Manage Orders',
      description: 'View and manage incoming orders in the "Orders" tab. Approve or deny reservations from students.',
      icon: <ShoppingCart className="h-8 w-8 text-purple-600" />,
      position: 'top-right',
      target: 'orders-tab'
    },
    {
      id: 'pending-orders',
      title: 'Pending Orders Card',
      description: 'This card shows orders waiting for your approval. It updates in real-time as students make reservations.',
      icon: <Clock className="h-8 w-8 text-yellow-600" />,
      position: 'center',
      target: 'pending-orders-card'
    },
    {
      id: 'revenue-tracking',
      title: 'Track Your Revenue',
      description: 'Monitor your sales performance with the revenue stats above. See total sales, items sold, and earnings.',
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      position: 'top',
      target: 'revenue-stats'
    },
    {
      id: 'sales-graph',
      title: 'Sales Analytics',
      description: 'The chart below shows your sales trends over time. It updates automatically as you receive new orders. When you have no sales yet, it shows a helpful message.',
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      position: 'bottom',
      target: 'sales-chart'
    },
    {
      id: 'share-store',
      title: 'Share Your Store',
      description: 'Get your personal store link to share with classmates. They can browse and reserve your items directly.',
      icon: <Package className="h-8 w-8 text-indigo-600" />,
      position: 'bottom-right',
      target: 'share-button'
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Start by adding your first product, then share your store link to begin selling to fellow students.',
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      position: 'center'
    }
  ];

  const currentStepData = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const getTooltipPosition = () => {
    const positions = {
      'center': 'fixed inset-0 flex items-center justify-center z-50',
      'top': 'fixed top-32 left-1/2 transform -translate-x-1/2 z-50',
      'top-right': 'fixed top-32 right-8 z-50',
      'bottom': 'fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50',
      'bottom-right': 'fixed bottom-32 right-8 z-50'
    };
    return positions[currentStepData.position] || positions.center;
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleSkip} />
      
      {/* Tutorial Tooltip */}
      <div className={`${getTooltipPosition()} max-w-md mx-4`}>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 relative animate-in slide-in-from-bottom-2 duration-300 max-h-[80vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Step Content */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              {currentStepData.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip Tutorial
              </button>
              <button
                onClick={handleNext}
                className="flex items-center space-x-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>{currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}</span>
                {currentStep < tutorialSteps.length - 1 && <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerTutorial;
