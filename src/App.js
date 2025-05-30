import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import Firebase instances from your new firebase.js file
import { db, auth, initialAuthToken, collection, doc, setDoc, getDoc, query, onSnapshot, onAuthStateChanged, signInWithCustomToken, signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from './firebase';

import './App.css'; // Your main App.css for general styles
import StrategyDetails from './StrategyDetails'; // Your StrategyDetails component

// App ID for Firestore collections
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-investment-app';

// Home Component - Now fetches strategies dynamically
const Home = () => {
  const [strategies, setStrategies] = useState([]);
  const [loadingStrategies, setLoadingStrategies] = useState(true);
  const [strategiesError, setStrategiesError] = useState(null);

  useEffect(() => {
    const fetchStrategies = () => {
      setLoadingStrategies(true);
      const strategiesCollectionRef = collection(db, `artifacts/${appId}/public/data/strategies`);
      const q = query(strategiesCollectionRef);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedStrategies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStrategies(fetchedStrategies);
        setLoadingStrategies(false);
      }, (error) => {
        console.error("Error fetching strategies for Home component:", error);
        setStrategiesError("Failed to load strategies list. Please try again.");
        setLoadingStrategies(false);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    };

    fetchStrategies();
  }, []); // Run once on component mount

  if (loadingStrategies) {
    return (
      <div className="app-home-container">
        <p className="app-intro">Loading strategies list...</p>
      </div>
    );
  }

  if (strategiesError) {
    return (
      <div className="app-home-container">
        <p className="app-intro error-message">{strategiesError}</p>
      </div>
    );
  }

  return (
    <div className="app-home-container">
      <h1 className="app-main-title">Investment Strategies</h1>
      <p className="app-intro">Select a strategy to view its details:</p>
      {strategies.length > 0 ? (
        <div className="strategy-list-container">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="strategy-list-item">
              <Link to={`/strategies/${strategy.strategyCode}`}>{strategy.strategyName} ({strategy.strategyCode})</Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="app-intro">No strategies available. Please upload data to Firestore.</p>
      )}
      <p className="login-prompt">
        If you have a login screen, ensure you've logged in or bypassed it to see this content.
        <br/>
        {/* The image_bdc552.png reference was for a login screen, ensure it's handled */}
      </p>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [authError, setAuthError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Authentication state listener and initial sign-in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Sign in anonymously if no custom token is provided
        if (initialAuthToken) { // Use the imported initialAuthToken
          try {
            await signInWithCustomToken(auth, initialAuthToken);
          } catch (error) {
            console.error("Error signing in with custom token:", error);
            await signInAnonymously(auth); // Fallback to anonymous if custom token fails
          }
        } else {
          await signInAnonymously(auth);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-xl font-semibold text-gray-700">Loading application...</div>
      </div>
    );
  }

  // Modal Component (kept here as it's a global UI element)
  const Modal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
  const handleAuthAction = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        await setDoc(doc(db, `artifacts/${appId}/users/${userId}/profile`, 'userInfo'), {
          firstName,
          lastName,
          email,
          phone,
          country,
          createdAt: new Date().toISOString()
        });
        setModalMessage("Account created successfully! You are now logged in.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      let errorMessage = "An unknown error occurred.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use. Please try logging in or use a different email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password authentication is not enabled.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use at least 6 characters.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
        default:
          errorMessage = `Authentication failed: ${error.message}`;
      }
      setAuthError(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      // Reset relevant states
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setPhone('');
      setCountry('');
      setAuthError('');
    } catch (error) {
      console.error("Error logging out:", error);
      setModalMessage("Failed to log out. Please try again.");
      setShowModal(true);
    }
  };

  return (
    <Router>
      <div className="App">
        {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}

        {!user || user.isAnonymous ? (
          // Login/Registration Section
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
              {isLogin ? 'Login' : 'Create Account'}
            </h2>
            <form onSubmit={handleAuthAction} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">Country of Residence</label>
                    <input
                      type="text"
                      id="country"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {authError && <p className="text-red-600 text-sm mt-2">{authError}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        ) : (
          // Dashboard Section
          <Routes>
            {/* Route for the home page (list of strategies) */}
            <Route path="/" element={<Home />} />
            {/* Route for individual strategy details page */}
            <Route path="/strategies/:strategyCode" element={<StrategyDetails />} />
            {/* Add other routes as needed */}
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
