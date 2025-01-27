const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.run(
  "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, userName TEXT, title TEXT)"
);

app.get("/todo-list/:userName", (req, res) => {
  const { userName } = req.params;
  db.all("SELECT * FROM tasks WHERE userName = ?", [userName], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/todo-list", (req, res) => {
  const { userName, title } = req.body;
  db.run(
    "INSERT INTO tasks (userName, title) VALUES (?, ?)",
    [userName, title],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, userName, title });
      }
    }
  );
});

app.delete("/todo-list/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Task deleted" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});