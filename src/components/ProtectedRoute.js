import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Header from './Header';

const ProtectedRoute = ({ children, currentUser, userRole }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <Header currentUser={currentUser} userRole={userRole} onLogout={handleLogout} />
      {children}
    </>
  );
};

export default ProtectedRoute;