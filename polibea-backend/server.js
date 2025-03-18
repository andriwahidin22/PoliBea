require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const fs = require('fs'); 

const app = express();
const PORT = process.env.PORT || 5001;
const authRoutes = require('./routes/auth');


// Koneksi ke Database
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'beasiswa_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Pastikan folder `/uploads` ada
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

// ✅ Static Folder untuk menyajikan gambar
app.use('/uploads', express.static(uploadsPath));

// ✅ Konfigurasi Multer untuk Upload Gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath); // Simpan di folder uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nama unik
    }
});
const upload = multer({ storage });

/* ========================== ✅ API ENDPOINTS ========================== */

// ✅ Ambil Semua Beasiswa
app.get('/api/scholarships', (req, res) => {
    const baseUrl = `http://localhost:${PORT}/uploads/`;
    const sql = `SELECT id, name, photo, start_date, end_date, description, status, link_pendaftaran, syarat_pendaftaran FROM scholarships`;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        results = results.map(item => {
            let photoPath = item.photo ? `${baseUrl}${item.photo}` : null;

            if (item.photo && !fs.existsSync(path.join(uploadsPath, item.photo))) {
                photoPath = null; 
            }

            return { ...item, photo: photoPath };
        });

        res.json(results);
    });
});

// ✅ Ambil Beasiswa Berdasarkan ID
app.get('/api/scholarships/:id', (req, res) => {
    const { id } = req.params;
    const baseUrl = `http://localhost:${PORT}/uploads/`;
    const sql = "SELECT * FROM scholarships WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Beasiswa tidak ditemukan" });

        let scholarship = result[0];
        let photoPath = scholarship.photo ? `${baseUrl}${scholarship.photo}` : null;

        // **Cek apakah file benar-benar ada**
        if (scholarship.photo && !fs.existsSync(path.join(uploadsPath, scholarship.photo))) {
            photoPath = null; // Jangan kirim URL jika gambar tidak ada
        }

        res.json({ ...scholarship, photo: photoPath });
    });
});

// ✅ Tambah Beasiswa
app.post('/api/scholarships', upload.single('photo'), (req, res) => {
    const { name, start_date, end_date, description, status, link_pendaftaran, syarat_pendaftaran } = req.body;
    const photo = req.file ? req.file.filename : null; // Hanya simpan nama file

    if (!name || !start_date || !end_date || !description || !status || !link_pendaftaran || !syarat_pendaftaran) {
        return res.status(400).json({ error: "Semua field harus diisi!" });
    }

    const sql = `INSERT INTO scholarships (name, photo, start_date, end_date, description, status, link_pendaftaran, syarat_pendaftaran) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, photo, start_date, end_date, description, status, link_pendaftaran, syarat_pendaftaran], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Beasiswa berhasil ditambahkan!", id: result.insertId });
    });
});

// ✅ Update Beasiswa
app.put('/api/scholarships/:id', upload.single('photo'), (req, res) => {
    const { name, start_date, end_date, description, status, link_pendaftaran, syarat_pendaftaran } = req.body;
    const photo = req.file ? req.file.filename : null;

    let sql = `UPDATE scholarships SET name=?, start_date=?, end_date=?, description=?, status=?, link_pendaftaran=?, syarat_pendaftaran=?`;
    let params = [name, start_date, end_date, description, status, link_pendaftaran, syarat_pendaftaran];

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
