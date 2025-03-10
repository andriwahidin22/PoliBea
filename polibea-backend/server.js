const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Import Routes
const scholarshipRoutes = require('./routes/scholarship');
const authRoutes = require('./routes/auth');

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Static Folder untuk Gambar
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔹 Gunakan Routes
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/auth', authRoutes);

// ✅ Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'beasiswa_db'
});

// 🔹 Cek koneksi database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Database connected!");
    }
});

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

// ✅ Ambil Semua Beasiswa
app.get('/api/scholarships', (req, res) => {
    const sql = "SELECT id, name, CONCAT('http://localhost:5001/uploads/', photo) AS photo, timeline, description, status FROM scholarships";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ✅ Tambah Beasiswa
app.post('/api/scholarships', upload.single('photo'), (req, res) => {
    const { name, timeline, description, status } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Simpan path lengkap

    if (!name || !timeline || !description || !status) {
        return res.status(400).json({ error: "Semua field harus diisi!" });
    }

    const sql = "INSERT INTO scholarships (name, photo, timeline, description, status) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, photo, timeline, description, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Beasiswa berhasil ditambahkan!", id: result.insertId });
    });
});

// ✅ Update Beasiswa
app.put('/api/scholarships/:id', upload.single('photo'), (req, res) => {
    const { name, timeline, description, status } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Simpan path lengkap

    let sql = "UPDATE scholarships SET name=?, timeline=?, description=?, status=?";
    let params = [name, timeline, description, status];

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

// ✅ Jalankan Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
