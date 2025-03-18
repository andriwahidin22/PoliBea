const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const multer = require('multer');
const path = require('path');

// 🔹 Konfigurasi Multer untuk menyimpan file di folder "uploads"
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
router.get('/', scholarshipController.getAllScholarships);

// ✅ Tambah beasiswa (dengan upload gambar)
router.post('/', upload.single('photo'), scholarshipController.createScholarship);

// ✅ Update beasiswa
router.put('/:id', upload.single('photo'), scholarshipController.updateScholarship);

// ✅ Hapus beasiswa
router.delete('/:id', scholarshipController.deleteScholarship);

module.exports = router;
