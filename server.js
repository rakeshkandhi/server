const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


// In-memory array to store products
let products = [
    { "id": 1, "name": "Product1", "price": 100 },
    { "id": 2, "name": "Product2", "price": 200 },
    { "id": 3, "name": "Product3", "price": 300 }
];


// Get server home page
app.get('/', (req, res) => {
    res.send("This is the server home page");
});


// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});


// Get a single product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});


// Create a new product
app.post('/products', (req, res) => {
    const { id, name, price } = req.body;
    if (!id || !name || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});


// Update a product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const updatedProduct = { ...products[productIndex], name, price };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
});


// Delete a product
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    res.json(deletedProduct);
});


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});