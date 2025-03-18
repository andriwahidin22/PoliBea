const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'User tidak ditemukan' });
        }

        // Bandingkan password menggunakan async/await
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // ✅ Kirim response dengan token & redirect ke dashboard
        return res.status(200).json({
            auth: true,
            token,
            redirect: "/admin/dashboard",
            user: { id: user.id, username: user.username }
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
