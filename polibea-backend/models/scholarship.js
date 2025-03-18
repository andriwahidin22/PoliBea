const db = require('../config/db');

const Scholarship = {
    getAll: async () => {
        const sql = 'SELECT id, name, photo, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran FROM scholarships';
        const [rows] = await db.promise().query(sql);

        return rows.map(row => ({
            ...row,
            photo: row.photo ? row.photo.toString() : null // Pastikan photo berupa string
        }));
    },

    create: async (name, photo, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran) => {
        const sql = 'INSERT INTO scholarships (name, photo, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.promise().execute(sql, [name, photo, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran]);
        return { id: result.insertId, name, photo, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran };
    },

    update: async (id, name, photo, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran) => {
        try {
            let sql = 'UPDATE scholarships SET name=?, start_date=?, end_date=?, description=?, status=?, syarat_pendaftaran=?, link_pendaftaran=? WHERE id=?';
            let values = [name, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran, id];

            if (photo) {
                sql = 'UPDATE scholarships SET name=?, photo=?, start_date=?, end_date=?, description=?, status=?, syarat_pendaftaran=?, link_pendaftaran=? WHERE id=?';
                values = [name, photo, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran, id];
            }

            const [result] = await db.promise().execute(sql, values);
            return result.affectedRows ? { id, name, photo, start_date, end_date, description, status, syarat_pendaftaran, link_pendaftaran } : null;
        } catch (error) {
            console.error("Update error:", error);
            throw new Error("Gagal mengupdate beasiswa.");
        }
    },

    delete: async (id) => {
        const sql = 'DELETE FROM scholarships WHERE id=?';
        await db.promise().execute(sql, [id]);
    }
};

module.exports = Scholarship;
