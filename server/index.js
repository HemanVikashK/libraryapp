const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
const secretKey = "vik&rajan1";
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
app.post("/books", async (req, res) => {
  try {
    const { title, author, subject, publishdate } = req.body;
    const newBook = await pool.query(
      "INSERT INTO books(title, author, subject, publishdate) VALUES($1, $2, $3, $4) RETURNING *",
      [title, author, subject, publishdate]
    );

    res.status(201).json(newBook.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    res.json({ message: "Book deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, subject, publishdate } = req.body;

    const updateBook = await pool.query(
      "UPDATE books SET title = $1, author = $2, subject = $3, publishdate = $4 WHERE id = $5 RETURNING *",
      [title, author, subject, publishdate, id]
    );

    if (updateBook.rows.length > 0) {
      res.json(updateBook.rows[0]);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
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
      const id = user.rows[0].id;
      const token = jwt.sign({ userId: id }, secretKey, {
        expiresIn: "1h",
      });

      res.send({ status: true, token: token });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", status: false });
  }
});
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token required." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log(decoded.userId);
    req.userId = decoded.userId;
    next();
  });
};

// Protected route to fetch user data
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.userId,
    ]);
    const user = response.rows[0]; // Assuming user ID is unique, so we take the first row
    res.json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
