const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Pastikan env ter-load

// ✅ Login User
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'User tidak ditemukan' });
        }

        // Bandingkan password yang di-hash
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ auth: true, token, user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Verifikasi Token dan Kirim Data User
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByUsername(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.json({ auth: true, user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
