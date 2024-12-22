const express = require('express');
const cors = require('cors'); // For handling Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // For parsing JSON and form data

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample Data
let items = [
    { id: 1, name: 'Item 1', price: 100 },
    { id: 2, name: 'Item 2', price: 200 },
];

// Routes
// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Simple Backend Server!');
});

// Get All Items
app.get('/items', (req, res) => {
    res.json(items);
});

// Add a New Item
app.post('/items', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and Price are required.' });
    }
    const newItem = { id: items.length + 1, name, price };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Delete an Item
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id !== parseInt(id));
    res.json({ message: 'Item deleted successfully.' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
