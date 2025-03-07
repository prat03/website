import React, { useState, useEffect } from 'react';
import { getUsers } from '../../data/users';
 
function UserDataList({ user, userData, onEditUser }){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
 
    const fetchUsers = async () => {
        const fetchedUsers = getUsers();
        setUsers(fetchedUsers);
    };
    fetchUsers();
  },[]);
 
  // const handleAddUser = (newUsername, newEmail) => {
  //   const newUser = { username: newUsername, email: newEmail };
  //   addUser(newUser);
  //   console.log('New user added:', newUser);
  //   setUsers(prevUsers => {
  //   return [...prevUsers, newUser] });
  // }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here (will be implemented later)
    // console.log("Form was submitted, but no function is currently implemented");
    setUsername('');
    setEmail('');
    //  handleAddUser(username, email);
  };
 
  return (
    <div>
      <h2>User Data</h2>
      <form onSubmit={handleSubmit}>
      {/* <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button> */}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id} >
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => onEditUser(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </form>
    </div>
  );
};
export default UserDataList;