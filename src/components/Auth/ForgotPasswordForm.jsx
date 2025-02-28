import React, { useState } from 'react';

function ForgotPasswordForm({ onLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Resetting password for:', email);
    // Replace with your actual password reset logic
    onLogin();
    setEmail('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
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
        <button type="submit">Reset Password</button>
        <p>
        <button type="button" onClick={onLogin}>
          Back to Login
        </button>
        </p>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
