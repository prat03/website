// import {username, email, password} from './SignupForm.jsx';
// Simulate a server-side database in backend
let users = [
  { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
];
 
let nextId = 2;
 
export const getUsers = () => {
  return [...users];
};
 
export const addUser = (user) => {
  const newUser = { id: nextId++, ...user };
  users.push(newUser);
};
 
export const updateUser = (updatedUser) => {
  users = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
};
 
export const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};