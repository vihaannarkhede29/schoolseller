// Data management utilities for SchoolSeller app
import { format } from 'date-fns';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';

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
export const getItems = async () => {
  try {
    const itemsSnapshot = await getDocs(collection(db, 'items'));
    return itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting items:', error);
    return [];
  }
};

export const getItemById = async (id) => {
  try {
    const itemDoc = await getDoc(doc(db, 'items', id));
    if (itemDoc.exists()) {
      return { id: itemDoc.id, ...itemDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const getItemsBySeller = async (sellerId) => {
  try {
    const q = query(collection(db, 'items'), where('sellerId', '==', sellerId));
    const itemsSnapshot = await getDocs(q);
    return itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting items by seller:', error);
    return [];
  }
};

export const addItem = async (item) => {
  try {
    const newItem = {
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    const docRef = await addDoc(collection(db, 'items'), newItem);
    return { id: docRef.id, ...newItem };
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const updateItem = async (id, updates) => {
  try {
    const itemRef = doc(db, 'items', id);
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(itemRef, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
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
export const getOrders = async () => {
  try {
    const ordersSnapshot = await getDocs(collection(db, 'orders'));
    return ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

export const getOrdersBySeller = async (sellerId) => {
  try {
    const q = query(collection(db, 'orders'), where('sellerId', '==', sellerId));
    const ordersSnapshot = await getDocs(q);
    return ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting orders by seller:', error);
    return [];
  }
};

export const getOrdersByBuyer = async (buyerId) => {
  try {
    const q = query(collection(db, 'orders'), where('buyerId', '==', buyerId));
    const ordersSnapshot = await getDocs(q);
    return ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting orders by buyer:', error);
    return [];
  }
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
export const getSellerStats = async (sellerId) => {
  try {
    const items = await getItemsBySeller(sellerId);
    const orders = await getOrdersBySeller(sellerId);
    const confirmedOrders = orders.filter(order => order.status === 'confirmed');
    
    const totalSales = confirmedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalItems = items.length;
    const activeReservations = orders.filter(order => order.status === 'pending').length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    
    return {
      totalSales,
      totalItems,
      activeReservations,
      pendingOrders,
      totalOrders: confirmedOrders.length,
      totalItemsSold: confirmedOrders.reduce((sum, order) => sum + (order.quantity || 0), 0),
      totalRevenue: totalSales
    };
  } catch (error) {
    console.error('Error getting seller stats:', error);
    return {
      totalSales: 0,
      totalItems: 0,
      activeReservations: 0,
      pendingOrders: 0,
      totalOrders: 0,
      totalItemsSold: 0,
      totalRevenue: 0
    };
  }
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

