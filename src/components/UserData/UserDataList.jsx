import React, { useState, useEffect } from 'react';

function UserDataList({ user,userData, onEditUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (user) {
        setUsername(user.username);
        setEmail(user.email)
    }
  }, [user]);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...user, username, email });
  };

  return (
    <div>
      <h2>User Data</h2>
      <table onSubmit={handleSubmit}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => onEditUser(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDataList;
