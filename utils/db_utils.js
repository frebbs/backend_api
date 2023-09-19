import pool from '../config/db.js';

const dbUtils = {
    createUser: async ({ username, email, password }) => {
        const { rows } = await pool.query(
            `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email;`,
            [username, email, password]
        );
        return rows[0];
    },

    getUserById: async id => {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    },

    updateUser: async ({ id, username, email, password }) => {
        const { rows } = await pool.query(
            `UPDATE users
       SET username = $1, email = $2, password = $3
       WHERE id = $4
       RETURNING id, username, email;`,
            [username, email, password, id]
        );
        return rows[0];
    },

    deleteUser: async id => {
        const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        return rows[0];
    },

    getUserByEmail: async email => {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows[0];
    },

    getUserByUsername: async username => {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return rows[0];
    },

    getUserByEmailAndUsername: async ({ email, username }) => {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND username = $2',
            [email, username]
        );
        return rows[0];
    }
};

export default dbUtils;
