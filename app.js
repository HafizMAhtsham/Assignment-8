const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'your-secret-key'; 
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'Ahtsham' && password === '0330499333') {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
app.get('/protected', authenticateJWT, (req, res) => {
    res.send('Authenticated!');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
