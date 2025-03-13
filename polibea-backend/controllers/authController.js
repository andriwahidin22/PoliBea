const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); 

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

// ✅ Middleware untuk verifikasi token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) return res.status(403).json({ message: 'Token diperlukan!' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token tidak valid!' });

        req.userId = decoded.id;
        next();
    });
};

// ✅ Cek Profil User dari Token
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId); // Gunakan findById, bukan findByUsername
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.json({ auth: true, user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};