const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

require('dotenv').config();

// ✅ Koneksi Database
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'beasiswa_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ✅ API untuk Mendapatkan Semua Pengguna
router.get('/', (req, res) => {
    const sql = "SELECT id, username FROM users";  // Pastikan tabelnya benar
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
