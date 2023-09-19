import express from 'express';
import { createClient } from 'redis';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import pool from './config/db.js';
const client = createClient({
    url: 'redis://localhost:6379'
});

const app = express();
const PORT = 8080;


const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'your_secret_key', (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.user = data;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
};


app.use([
    express.json(),
    express.urlencoded({extended: true})
])

app.get('/', (req, res) => {
    res.json({
        message: "GET: Root Hit"
    })
})

app.post('/login', async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    // Query to find user by email
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [userEmail]);

    if (rows.length > 0) {
        const user = rows[0];

        // Use bcrypt to compare the hashed password with the plaintext password
        const match = await bcrypt.compare(userPassword, user.password);

        if (match) {
            // Passwords match, generate JWT
            const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ token });
        } else {
            // Passwords do not match
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        // User not found
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        // Insert the new user into the database
        const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email;
    `;
        const { rows } = await pool.query(query, [username, email, hashedPassword]);

        // Respond with the newly created user
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})