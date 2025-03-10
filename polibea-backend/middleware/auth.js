const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token tidak ditemukan!" });

    jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY", (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token tidak valid!" });
        req.user = decoded;
        next();
    });
};
