// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./db'); // Make sure this connects correctly to your MySQL

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Create product
app.post('/products', (req, res) => {
  const { name, description, image } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const sql = 'INSERT INTO products (name, description, image) VALUES (?, ?, ?)';
  db.query(sql, [name, description, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product added', id: result.insertId });
  });
});

// Get all products
app.get('/products', (req, res) => {
  const sql = 'SELECT id, name, description, image FROM products';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get single product by ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(results[0]);
  });
});

// Update product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body; // include image

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const sql = 'UPDATE products SET name = ?, description = ?, image = ?, updated_at = NOW() WHERE id = ?';
  db.query(sql, [name, description, image, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated successfully' });
  });
});

// Delete product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
