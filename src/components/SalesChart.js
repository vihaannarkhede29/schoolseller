import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { getOrdersBySeller, formatCurrency } from '../utils/dataManager';

const SalesChart = ({ sellerId, period = 'week' }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [totalSales, setTotalSales] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    // Load data and create chart
    loadChartData();
  }, [sellerId, period]);

  const loadChartData = async () => {
    try {
      setIsLoading(true);
      
      // Load orders data
      const orders = await getOrdersBySeller(sellerId);
      const confirmedOrders = orders.filter(order => order.status === 'confirmed');
      
      // Calculate total sales
      const total = confirmedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      setTotalSales(total);
      
      // Wait for Chart.js to be available, then create chart
      let retryCount = 0;
      const maxRetries = 50;
      
      const createChartWhenReady = () => {
        if (window.Chart && chartRef.current) {
          createChart(confirmedOrders);
        } else if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(createChartWhenReady, 100);
        } else {
          console.error('Chart.js failed to load');
          setIsLoading(false);
        }
      };
      
      createChartWhenReady();
    } catch (error) {
      console.error('Error loading chart data:', error);
      // Create chart with empty data if there's an error
      createChart([]);
    }
  };

  const createChart = (orders = []) => {
    if (!window.Chart) {
      setIsLoading(false);
      return;
    }
    
    if (!chartRef.current) {
      // Canvas not ready yet, try again in a moment
      setTimeout(() => createChart(orders), 50);
      return;
    }

    // Generate data based on orders or empty data for new users
    let labels, data;
    switch (period) {
      case 'day':
        labels = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'];
        data = [0, 0, 0, 0, 0, 0, 0];
        break;
      case 'week':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [0, 0, 0, 0, 0, 0, 0];
        break;
      case 'month':
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = [0, 0, 0, 0];
        break;
      default:
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [0, 0, 0, 0, 0, 0, 0];
    }

    const total = data.reduce((sum, value) => sum + value, 0);
    setTotalSales(total);

    try {
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: period === 'day' ? 'Hourly Earnings ($)' : 
                   period === 'week' ? 'Daily Earnings ($)' : 'Weekly Earnings ($)',
            data: data,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20,
              bottom: 40,
              left: 20,
              right: 20
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                padding: 20,
                usePointStyle: true
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': $' + context.parsed.y.toFixed(2);
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: period === 'day' ? 'Hourly Earnings ($)' : 
                      period === 'week' ? 'Daily Earnings ($)' : 'Weekly Earnings ($)',
                color: '#6b7280',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              },
              ticks: {
                color: '#6b7280',
                callback: function(value) {
                  return '$' + value.toFixed(2);
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false
              }
            },
            x: {
              display: true,
              title: {
                display: true,
                text: period === 'day' ? 'Time' : 
                      period === 'week' ? 'Days' : 'Weeks',
                color: '#6b7280',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              },
              ticks: {
                color: '#374151',
                font: {
                  size: 11,
                  weight: '500'
                },
                maxRotation: 0,
                minRotation: 0,
                padding: 8
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false,
                display: true
              }
            }
          }
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Chart error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <p className="text-sm text-gray-600">
              {period === 'day' ? 'Today (24 hours)' : 
               period === 'week' ? 'Last 7 days' : 
               period === 'month' ? 'Last 4 weeks' : 'Last 7 days'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalSales)}
          </div>
          <div className="text-sm text-gray-600">Total Sales</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-80 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading chart...</div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <canvas 
              key={`chart-${period}`} 
              ref={chartRef} 
              className="max-w-full max-h-full"
            ></canvas>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;

