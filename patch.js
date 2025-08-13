const express = require('express');
const app = express();

app.use(express.json());

// Example data
let users = [
  { id: 1, name: "Keshav", age: 21 },
  { id: 2, name: "Komal", age: 20 }
];

// PATCH API
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  let user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  Object.assign(user, updates); // partial update

  res.json({ message: "User updated", user });
});

app.listen(3000, () => console.log('Server running on port 3000'));
