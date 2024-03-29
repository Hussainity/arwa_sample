const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection settings
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'arwaprojectdb'
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Connected to the database');
});

// Serve static files from 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Home page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Login page route for student
app.get('/login-student', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login-student.html'));
});

// Login page route for teacher
app.get('/login-teacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'TEACHER.html'));
});

// Register page route for student
app.get('/register-student', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register-student.html'));
});

// Handle login
app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.send('Login failed');
        }
    });
});

// Handle Register
app.post('/register-form', (req, res) => {
    const { username, password, first_name } = req.body;

    connection.query('INSERT INTO users SET username = ?, password = ?, firstname = ?', [username, password, first_name], (error, results, fields) => {
        if (error) throw error;

        if (results.affectedRows > 0) {
            res.send('Registration successful');
        } else {
            res.send('Registration failed');
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
