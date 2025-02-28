// Simulate a server-side database
let users = [
  { id: 1, username: 'LoginForm.user1', email: 'LoginForm.user1@example.com', password: 'LoginForm.password1' },
  { id: 2, username: 'LoginForm.user2', email: 'LoginForm.user2@example.com', password: 'LoginForm.password2' },
];

let nextId = 3;

export const getUsers = () => {
  return [...users];
};

export const addUser = (user) => {
  const newUser = { id: nextId++, ...user };
  users.push(newUser);
};

export const updateUser = (updatedUser) => {
  users = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
};

export const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};
