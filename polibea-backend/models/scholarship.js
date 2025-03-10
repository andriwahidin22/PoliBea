const db = require('../config/db');

const Scholarship = {
    getAll: async () => {
        const sql = 'SELECT id, name, CONCAT("/uploads/", photo) AS photo, timeline, description, status FROM scholarships';
        const [rows] = await db.promise().query(sql);
        return rows;
    },

    create: async (name, photo, timeline, description, status) => {
        const sql = 'INSERT INTO scholarships (name, photo, timeline, description, status) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.promise().execute(sql, [name, photo, timeline, description, status]);
        return { id: result.insertId, name, photo, timeline, description, status };
    },

    update: async (id, name, photo, timeline, description, status) => {
        let sql = 'UPDATE scholarships SET name=?, timeline=?, description=?, status=? WHERE id=?';
        let values = [name, timeline, description, status, id];

        if (photo) {
            sql = 'UPDATE scholarships SET name=?, photo=?, timeline=?, description=?, status=? WHERE id=?';
            values = [name, photo, timeline, description, status, id];
        }

        await db.promise().execute(sql, values);
        return { id, name, photo, timeline, description, status };
    },

    delete: async (id) => {
        const sql = 'DELETE FROM scholarships WHERE id=?';
        await db.promise().execute(sql, [id]);
    }
};

module.exports = Scholarship;
