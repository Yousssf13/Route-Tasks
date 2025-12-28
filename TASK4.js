const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const filePath = path.join(__dirname, "users.json");

// Helper Functions //
function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeUsers(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// (1️) Add New User //
app.post("/user", (req, res) => {
  const { name, age, email } = req.body;
  const users = readUsers();

  const emailExists = users.find(u => u.email === email);
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    age,
    email
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User added", user: newUser });
});

// (2️) Update User By ID //
app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  const user = users.find(u => u.id == id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, age, email } = req.body;
  if (name) user.name = name;
  if (age) user.age = age;
  if (email) user.email = email;

  writeUsers(users);
  res.json({ message: "User updated", user });
});

// (3️) Delete User By ID (params or body) //
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  const newUsers = users.filter(u => u.id != id);
  if (users.length === newUsers.length) {
    return res.status(404).json({ message: "User not found" });
  }

  writeUsers(newUsers);
  res.json({ message: "User deleted" });
});


// (4️) Get User By Name //
app.get("/user/getByName", (req, res) => {
  const { name } = req.query;
  const users = readUsers();

  const result = users.filter(u => u.name === name);
  res.json(result);
});

// (5️) Get All Users //
app.get("/user", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// (6️) Filter Users By Min Age //
app.get("/user/filter", (req, res) => {
  const { minAge } = req.query;
  const users = readUsers();

  const filtered = users.filter(u => u.age >= minAge);
  res.json(filtered);
});

// (7️) Get User By ID //
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  const user = users.find(u => u.id == id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

/* Server */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
