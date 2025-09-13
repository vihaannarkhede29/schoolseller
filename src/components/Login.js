import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { ShoppingBag, User, Store, ArrowRight, CheckCircle } from 'lucide-react';

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        // Check if user has a role set
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role) {
          navigate(`/${userDoc.data().role.toLowerCase()}-dashboard`);
        } else {
          setShowRoleSelection(true);
        }
      } else {
        setUser(null);
        setShowRoleSelection(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // Just sign in with Google - the useEffect will handle the rest
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = async (role) => {
    try {
      setLoading(true);
      
      if (user) {
        // Save role to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: role
        }, { merge: true });
      }
      
      // Update localStorage with role as fallback
      const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
      userData.role = role;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Force a page reload to refresh the auth state and user role
      window.location.href = `/${role.toLowerCase()}-dashboard`;
    } catch (error) {
      console.error('Error setting role:', error);
      alert('Error setting role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowRoleSelection(false);
      setSelectedRole('');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (showRoleSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Choose Your Role</h1>
              <p className="text-gray-300">How would you like to use SchoolSeller?</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelection('Buyer')}
                disabled={loading}
                className="w-full p-6 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">I'm a Buyer</h3>
                    <p className="text-gray-300">Browse and reserve items from sellers</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white ml-auto" />
                </div>
              </button>

              <button
                onClick={() => handleRoleSelection('Seller')}
                disabled={loading}
                className="w-full p-6 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Store className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">I'm a Seller</h3>
                    <p className="text-gray-300">List items and manage reservations</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white ml-auto" />
                </div>
              </button>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleSignOut}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sign out and use different account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to SchoolSeller</h1>
            <p className="text-gray-300">A marketplace for students to buy, sell, and reserve items at school</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full p-4 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-3 shadow-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-400 text-sm">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-500/20 rounded-2xl p-6 border border-blue-400/30">
            <h3 className="text-white font-bold mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Why Google Sign-In?
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Secure and fast authentication</li>
              <li>• No need to remember passwords</li>
              <li>• Your data stays private and secure</li>
              <li>• Works seamlessly across all devices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;