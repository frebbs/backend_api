// db.js
import pkg from 'pg';
const { Pool } = pkg;

let pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'app',
    password: 'postgres',
    port: 5432,
});

const initializeDb = async () => {
    try {
        // Check if the database exists
        const dbCheckResult = await pool.query(`
      SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('app');
    `);

        // Create database if it doesn't exist
        if (dbCheckResult.rows.length === 0) {
            await pool.query('CREATE DATABASE app;');
        }

        pool = await new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'app',
            password: 'postgres',
            port: 5432,
        });

        // Create table if it doesn't exist
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(200),
        password VARCHAR(200) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL
      );
    `);
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};




initializeDb();

export default pool;
