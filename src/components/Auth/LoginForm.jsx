import React, { useState } from 'react';
 
function LoginForm({ onLogin, onForgotPassword, onSignUp, isLoading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//  handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
    setEmail('');
    setPassword('');
  };
 
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p>
          <button type="button" onClick={onForgotPassword}>
            Forgot Password?
          </button>
        </p>
        <p>
          Don't have an account?{' '}
          <button type="button" onClick={onSignUp}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
 
export default LoginForm;