import React, { useState, useEffect } from 'react';
import './App.css';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm';
import UserDataList from './components/UserData/UserDataList';
import UserDataEdit from './components/UserData/UserDataEdit';
import { getUsers, addUser, updateUser, findUserByEmail } from './data/users';
 
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot', 'dataList', 'dataEdit'
  const [selectedUser, setSelectedUser] = useState(null); // User to edit
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
 
  useEffect(() => {
    setUserData(getUsers());
  }, []);
 
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      const user = findUserByEmail(email);
      if (user && user.password === password) {
        setLoggedInUser(user);
        setView('dataList');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleSignup = async (newUser) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      addUser(newUser);
      setUserData(getUsers()); // Refresh the data
      setView('login');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setView('dataEdit');
  };
 
  const handleUpdateUser = async (updatedUser) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      updateUser(updatedUser);
      setUserData(getUsers()); // Refresh the data
      setView('dataList');
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleBack = () => {
    setView('login')
  };
 
  const handleBackToLogin = () => {
    setView('login')
  }
 
  const handleToSignUp = () => {
    setView('signup')
  }
 
  const handleLogout = () => {
    setLoggedInUser(null);
    setView('login');
  };
 
  return (
    <div className="app">
      <h1>Data</h1>
      {loggedInUser && (
        <div className="user-info">
          <p>Logged in as: {loggedInUser.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
 
      {view === 'login' && (
        <LoginForm
          onLogin={handleLogin}
          onForgotPassword={() => setView('forgot')}
          onSignUp={handleToSignUp}
          isLoading={isLoading}
          error={error}
        />
      )}
 
      {view === 'signup' && (
        <SignupForm
          onSignUp={handleSignup}
          onLogin={handleBackToLogin}
          isLoading={isLoading}
          error={error}
        />
      )}
 
      {view === 'forgot' && <ForgotPasswordForm onLogin={handleBack} />}
 
      {view === 'dataList' && (
        <UserDataList
          userData={userData}
          onEditUser={handleEditUser}
        />
      )}
 
      {view === 'dataEdit' && (
        <UserDataEdit
          user={selectedUser}
          onUpdateUser={handleUpdateUser}
          onCancel={() => setView('dataList')}
        />
      )}
    </div>
  );
}
 
export default App;