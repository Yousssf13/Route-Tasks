const fs = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream");

//--------------------------------------------(1)
if (fs.existsSync("./big.txt")) {
  const stream = fs.createReadStream("./big.txt");

  stream.on("data", (chunk) => {
    console.log("Chunk:", chunk.toString());
  });

  stream.on("end", () => {
    console.log("Finished reading file");
  });

  stream.on("error", (err) => {
    console.error(err.message);
  });
}

//--------------------------------------------------------(2)
if (fs.existsSync("./source.txt")) {
  const readStream = fs.createReadStream("./source.txt");
  const writeStream = fs.createWriteStream("./dest.txt");

  readStream.on("error", err => console.error(err.message));
  writeStream.on("error", err => console.error(err.message));

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File copied using streams");
  });
}

//------------------------------------------------------------(3)
if (fs.existsSync("./data.txt")) {
  pipeline(
    fs.createReadStream("./data.txt"),
    zlib.createGzip(),
    fs.createWriteStream("./data.txt.gz"),
    (err) => {
      if (err) console.error(err.message);
      else console.log("File compressed successfully");
    }
  );
}
//-------------------------------------------------------------part 2
const express = require("express");

const path = require("path");

const app = express();
app.use(express.json());

const FILE_PATH = path.join(__dirname, "users.json");


function readUsers() {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
}


function writeUsers(users) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
}


app.post("/user", (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) return res.status(400).json({ error: "All fields required" });

    const users = readUsers()
        
    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        age
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "User added", user: newUser });
});


app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const users = readUsers();
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    writeUsers(users);
    res.json({ message: "User updated", user });
});

app.delete("/user/:id", (req, res) => {
    const { id } = req.params;

    let users = readUsers();
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    const deletedUser = users.splice(userIndex, 1)[0];
    writeUsers(users);
    res.json({ message: "User deleted", user: deletedUser });
});


app.get("/user", (req, res) => {
    const users = readUsers();
    res.json(users);
});

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


