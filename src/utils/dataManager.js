// Data management utilities for SchoolSeller app
import { format } from 'date-fns';

// No sample data - app starts with empty state

// Local storage keys
const STORAGE_KEYS = {
  ITEMS: 'schoolseller_items',
  USERS: 'schoolseller_users',
  ORDERS: 'schoolseller_orders',
  CURRENT_USER: 'schoolseller_current_user',
  SETTINGS: 'schoolseller_settings'
};

// Initialize data in localStorage if not present
export const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.ITEMS)) {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      requireApproval: true,
      allowMessaging: true,
      schoolName: 'Your School Name'
    }));
  }
};

// Generic data management functions
export const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Items management
export const getItems = () => {
  return getData(STORAGE_KEYS.ITEMS);
};

export const getItemById = (id) => {
  const items = getItems();
  return items.find(item => item.id === id);
};

export const getItemsBySeller = (sellerId) => {
  const items = getItems();
  return items.filter(item => item.sellerId === sellerId);
};

export const addItem = (item) => {
  const items = getItems();
  const newItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date(),
    status: 'active'
  };
  items.push(newItem);
  setData(STORAGE_KEYS.ITEMS, items);
  return newItem;
};

export const updateItem = (id, updates) => {
  const items = getItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    setData(STORAGE_KEYS.ITEMS, items);
    return items[index];
  }
  return null;
};

export const deleteItem = (id) => {
  const items = getItems();
  const filteredItems = items.filter(item => item.id !== id);
  setData(STORAGE_KEYS.ITEMS, filteredItems);
  return true;
};

// Users management
export const getUsers = () => {
  return getData(STORAGE_KEYS.USERS);
};

export const getUserById = (id) => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getCurrentUser = () => {
  const currentUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return currentUserId ? getUserById(currentUserId) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, user.id);
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Orders management
export const getOrders = () => {
  return getData(STORAGE_KEYS.ORDERS);
};

export const getOrdersBySeller = (sellerId) => {
  const orders = getOrders();
  return orders.filter(order => order.sellerId === sellerId);
};

export const getOrdersByBuyer = (buyerId) => {
  const orders = getOrders();
  return orders.filter(order => order.buyerId === buyerId);
};

export const addOrder = (order) => {
  const orders = getOrders();
  const newOrder = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date(),
    status: 'pending'
  };
  orders.push(newOrder);
  setData(STORAGE_KEYS.ORDERS, orders);
  return newOrder;
};

export const updateOrder = (id, updates) => {
  const orders = getOrders();
  const index = orders.findIndex(order => order.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    if (updates.status === 'confirmed') {
      orders[index].confirmedAt = new Date();
    }
    setData(STORAGE_KEYS.ORDERS, orders);
    return orders[index];
  }
  return null;
};

// Settings management
export const getSettings = () => {
  return getData(STORAGE_KEYS.SETTINGS);
};

export const updateSettings = (updates) => {
  const settings = getSettings();
  const newSettings = { ...settings, ...updates };
  setData(STORAGE_KEYS.SETTINGS, newSettings);
  return newSettings;
};

// Analytics functions
export const getSellerStats = (sellerId) => {
  const items = getItemsBySeller(sellerId);
  const orders = getOrdersBySeller(sellerId);
  const confirmedOrders = orders.filter(order => order.status === 'confirmed');
  
  const totalSales = confirmedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalItems = items.length;
  const activeReservations = orders.filter(order => order.status === 'pending').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  
  return {
    totalSales,
    totalItems,
    activeReservations,
    pendingOrders,
    totalOrders: confirmedOrders.length
  };
};

export const getPopularItems = () => {
  const orders = getOrders();
  const confirmedOrders = orders.filter(order => order.status === 'confirmed');
  
  const itemCounts = {};
  confirmedOrders.forEach(order => {
    order.items.forEach(item => {
      if (itemCounts[item.itemId]) {
        itemCounts[item.itemId].quantity += item.quantity;
      } else {
        itemCounts[item.itemId] = {
          itemId: item.itemId,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        };
      }
    });
  });
  
  return Object.values(itemCounts)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);
};

// Utility functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'N/A';
    }
    return format(dateObj, 'MMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'N/A';
    }
    return format(dateObj, 'MMM dd, yyyy h:mm a');
  } catch (error) {
    console.error('Error formatting date time:', error);
    return 'N/A';
  }
};

