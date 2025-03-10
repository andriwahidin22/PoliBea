const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: (username, hashedPassword) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    findByUsername: (username) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) return reject(err);
                resolve(results.length > 0 ? results[0] : null);
            });
        });
    }
};

module.exports = User;
