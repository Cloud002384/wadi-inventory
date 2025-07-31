const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const db = new sqlite3.Database('./inventory.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to the SQLite database.');
});

db.run(\`
  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    name TEXT,
    category TEXT,
    quantity INTEGER,
    entrance TEXT,
    leave TEXT,
    photo TEXT
  )
\`);

app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/items', (req, res) => {
  const { id, name, category, quantity, entrance, leave, photo } = req.body;
  db.run(\`
    INSERT INTO items (id, name, category, quantity, entrance, leave, photo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  \`, [id, name, category, quantity, entrance, leave, photo], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.put('/items/:id', (req, res) => {
  const { name, category, quantity, entrance, leave, photo } = req.body;
  db.run(\`
    UPDATE items SET name=?, category=?, quantity=?, entrance=?, leave=?, photo=?
    WHERE id=?
  \`, [name, category, quantity, entrance, leave, photo, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/items/:id', (req, res) => {
  db.run('DELETE FROM items WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:\${PORT}`));