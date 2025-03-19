const db = require('../config/db');
const bcrypt = require('bcrypt');

const authController = {
    login: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username dan password harus diisi!" });
        }

        try {
            // ✅ 1. Cek apakah user ada di database
            const sql = 'SELECT * FROM users WHERE username = ?';
            const [users] = await db.promise().query(sql, [username]);

            if (users.length === 0) {
                return res.status(401).json({ message: "User tidak ditemukan!" });
            }

            const user = users[0];

            // ✅ 2. Bandingkan password dengan hash di database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Password salah!" });
            }

            res.json({ message: "Login berhasil!", user });
        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    }
};

module.exports = authController;