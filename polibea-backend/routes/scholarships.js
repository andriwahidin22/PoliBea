const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('../middleware/authMiddleware');

// 🔹 Konfigurasi Multer untuk Upload Gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ✅ Ambil semua beasiswa
router.get('/', verifyToken, scholarshipController.getAllScholarships);

// ✅ Tambah beasiswa
router.post('/', verifyToken, upload.single('photo'), scholarshipController.createScholarship);

// ✅ Update beasiswa
router.put('/:id', verifyToken, upload.single('photo'), scholarshipController.updateScholarship);

// ✅ Hapus beasiswa
router.delete('/:id', verifyToken, scholarshipController.deleteScholarship);

module.exports = router;
