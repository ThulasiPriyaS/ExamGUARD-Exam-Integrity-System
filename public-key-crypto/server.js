const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Encryption and Decryption functions
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Use a consistent key in practice
const iv = crypto.randomBytes(16);

function encrypt(text, key, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encrypted, key, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Serve the renamed HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'front.html'));
});

// API Endpoints
app.post('/encrypt', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required for encryption' });
    }
    const encrypted = encrypt(text, key, iv);
    console.log('Encrypted:', encrypted); // Log encrypted text
    res.json({ encrypted });
});

app.post('/decrypt', (req, res) => {
    const { encrypted } = req.body;
    if (!encrypted) {
        return res.status(400).json({ error: 'Encrypted text is required for decryption' });
    }
    const decrypted = decrypt(encrypted, key, iv);
    console.log('Decrypted:', decrypted); // Log decrypted text
    res.json({ decrypted });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
