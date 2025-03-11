const Scholarship = require('../models/scholarship');

exports.getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.getAll();

        // Tambahkan URL lengkap untuk setiap photo
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const formattedScholarships = scholarships.map(scholarship => ({
            ...scholarship,
            photo: scholarship.photo ? `${baseUrl}${scholarship.photo}` : null,
        }));

        res.json(formattedScholarships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createScholarship = async (req, res) => {
    try {
        const { name, timeline, description, status } = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !timeline || !description || !status) {
            return res.status(400).json({ error: "Semua field harus diisi!" });
        }

        const newScholarship = await Scholarship.create(name, photo, timeline, description, status);

        // Kembalikan URL lengkap
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        res.json({
            message: "Beasiswa berhasil ditambahkan!",
            scholarship: {
                ...newScholarship,
                photo: newScholarship.photo ? `${baseUrl}${newScholarship.photo}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateScholarship = async (req, res) => {
    try {
        const { name, timeline, description, status } = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : null;
        const updatedScholarship = await Scholarship.update(req.params.id, name, photo, timeline, description, status);

        // Kembalikan URL lengkap
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        res.json({
            message: "Beasiswa berhasil diperbarui!",
            scholarship: {
                ...updatedScholarship,
                photo: updatedScholarship.photo ? `${baseUrl}${updatedScholarship.photo}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteScholarship = async (req, res) => {
    try {
        await Scholarship.delete(req.params.id);
        res.json({ message: "Beasiswa berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
