import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
 
function UserDataEdit({ user, onCancel, onUpdated }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
 
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);
 
  const { id } = useParams();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Basic form validation (you can add more robust validation here)
    if (!username || !email) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch(`/api/data/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });
 
      if (response.ok) {
        alert('User updated successfully!');
        if (onUpdated) {
          onUpdated();
        }
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
    onCancel();
  };
 
  return (
    <div className="form-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
 
export default UserDataEdit;