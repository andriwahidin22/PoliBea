require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Koneksi ke Database
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'beasiswa_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Static Folder untuk Gambar
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔹 Konfigurasi Multer untuk Upload Gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder tempat menyimpan gambar
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nama unik
    }
});
const upload = multer({ storage });

/* ========================== ✅ API ENDPOINTS ========================== */

// ✅ Ambil Semua Beasiswa (Foto pakai URL lengkap)
app.get('/api/scholarships', (req, res) => {
    const sql = `
        SELECT id, name, 
        IF(photo IS NOT NULL, CONCAT(?, photo), NULL) AS photo, 
        timeline, description, status, link_pendaftaran, syarat_pendaftaran
        FROM scholarships
    `;
    db.query(sql, [`http://localhost:${PORT}/uploads/`], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ✅ Tambah Beasiswa
app.post('/api/scholarships', upload.single('photo'), (req, res) => {
    const { name, timeline, description, status, link_pendaftaran, syarat_pendaftaran } = req.body;
    const photo = req.file ? req.file.filename : null; // Hanya simpan nama file

    console.log("📩 Data Diterima dari Client:", req.body); // Debugging

    if (!name || !timeline || !description || !status || !link_pendaftaran || !syarat_pendaftaran) {
        return res.status(400).json({ error: "Semua field harus diisi!" });
    }

    const sql = `
        INSERT INTO scholarships (name, photo, timeline, description, status, link_pendaftaran, syarat_pendaftaran) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, photo, timeline, description, status, link_pendaftaran, syarat_pendaftaran], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Beasiswa berhasil ditambahkan!", id: result.insertId });
    });
});

// ✅ Update Beasiswa
app.put('/api/scholarships/:id', upload.single('photo'), (req, res) => {
    const { name, timeline, description, status, link_pendaftaran, syarat_pendaftaran } = req.body;
    const photo = req.file ? req.file.filename : null; // Hanya simpan nama file

    let sql = `
        UPDATE scholarships 
        SET name=?, timeline=?, description=?, status=?, link_pendaftaran=?, syarat_pendaftaran=?
    `;
    let params = [name, timeline, description, status, link_pendaftaran, syarat_pendaftaran];

    if (photo) {
        sql += ", photo=?";
        params.push(photo);
    }

    sql += " WHERE id=?";
    params.push(req.params.id);

    db.query(sql, params, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Beasiswa berhasil diperbarui!" });
    });
});

// ✅ Hapus Beasiswa
app.delete('/api/scholarships/:id', (req, res) => {
    db.query("DELETE FROM scholarships WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Beasiswa berhasil dihapus!" });
    });
});

/* ========================== 🚀 Jalankan Server ========================== */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
