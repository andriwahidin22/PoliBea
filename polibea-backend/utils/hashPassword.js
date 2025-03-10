const bcrypt = require('bcryptjs');
const mysql = require('mysql');

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan user database Anda
    password: '', // Ganti dengan password database Anda
    database: 'beasiswa_db'
});

// Fungsi untuk hash password dan menyimpan ke database
const createUser = async (username, plainPassword) => {
    const hashedPassword = bcrypt.hashSync(plainPassword, 10); // 🔐 Hash password

    const query = 'INSERT INTO users (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)';
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error('❌ Error:', err);
            return;
        }
        console.log('✅ User berhasil ditambahkan dengan password hash!');
    });

    db.end();
};

// Jalankan dengan user & password yang ingin ditambahkan
createUser('admin', 'admin123');
