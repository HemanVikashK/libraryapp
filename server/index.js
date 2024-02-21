const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Implement your API endpoints here
app.get("/books", async (req, res) => {
  try {
    const books = await pool.query(
      "SELECT id, title, author, subject, publishDate FROM books"
    );

    res.send(books.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await pool.query(
      "INSERT INTO users(username,email,password)VALUES($1,$2,$3)",
      [username, email, password]
    );
    res.send({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", status: false });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email + " " + password);
    const user = await pool.query("SELECT * from users WHERE email=$1", [
      email,
    ]);
    if (user.rows[0].password === password) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", status: false });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
