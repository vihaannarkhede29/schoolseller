import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Analytics } from '@vercel/analytics/react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import SellerDashboard from './components/SellerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import ItemDetail from './components/ItemDetail';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import Orders from './components/Orders';
import AdminPanel from './components/AdminPanel';
import SellerStoreView from './components/SellerStoreView';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        // Try to get user role from Firestore, fallback to localStorage
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role) {
            setUserRole(userDoc.data().role);
          } else {
            // Fallback to localStorage
            const localUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            setUserRole(localUser.role || null);
          }
        } catch (error) {
          console.error('Error getting user role:', error);
          // Fallback to localStorage
          const localUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          setUserRole(localUser.role || null);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
        localStorage.removeItem('currentUser');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg">Loading SchoolSeller...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <main className="min-h-screen">
          <Routes>
            {/* Public routes */}
            <Route 
              path="/" 
              element={
                currentUser && userRole ? 
                <Navigate to={`/${userRole.toLowerCase()}-dashboard`} replace /> : 
                <LandingPage />
              } 
            />
            <Route 
              path="/login" 
              element={
                currentUser && userRole ? 
                <Navigate to={`/${userRole.toLowerCase()}-dashboard`} replace /> : 
                <Login />
              } 
            />
            
            {/* Protected routes */}
            <Route 
              path="/seller-dashboard" 
              element={
                currentUser && userRole === 'Seller' ? 
                <ProtectedRoute currentUser={currentUser} userRole={userRole}>
                  <SellerDashboard user={currentUser} />
                </ProtectedRoute> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/buyer-dashboard" 
              element={
                currentUser && userRole === 'Buyer' ? 
                <ProtectedRoute currentUser={currentUser} userRole={userRole}>
                  <BuyerDashboard user={currentUser} />
                </ProtectedRoute> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/item/:id" 
              element={
                currentUser ? 
                <ProtectedRoute currentUser={currentUser} userRole={userRole}>
                  <ItemDetail user={currentUser} />
                </ProtectedRoute> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/seller/:userId" 
              element={
                currentUser ? 
                <ProtectedRoute currentUser={currentUser} userRole={userRole}>
                  <SellerStoreView user={currentUser} />
                </ProtectedRoute> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/add-item" 
              element={
                currentUser && userRole === 'Seller' ? 
                <ProtectedRoute currentUser={currentUser} userRole={userRole}>
                  <AddItem user={currentUser} />
                </ProtectedRoute> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/edit-item/:id" 
              element={
                currentUser && userRole === 'Seller' ? 
                <ProtectedRoute currentUser={currentUser} userRole={userRole}>
                  <EditItem user={currentUser} />
                </ProtectedRoute> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/orders" 
              element={
                currentUser ? 
                <ProtectedRoute currentUser={currentUser} userRole={userRole}>
                  <Orders user={currentUser} />
                </ProtectedRoute> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/admin" 
              element={
                currentUser && userRole === 'Admin' ? 
                <ProtectedRoute currentUser={currentUser} userRole={userRole}>
                  <AdminPanel user={currentUser} />
                </ProtectedRoute> : 
                <Navigate to="/login" replace />
              } 
            />
            
          </Routes>
        </main>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;