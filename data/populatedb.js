require('dotenv').config();
const pool = require("../data/pool")

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        membership_status BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255),
        title VARCHAR(30) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

async function insertSampleData() {
  try {
    const hashedPassword = '$2b$10$L9kmkk49Z8Ez/xWErlbCceGdAXDcpIJ5ouXcLeJCbDXdETdLXcC3e';

    await pool.query(
      `INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (username) DO NOTHING`,
      ['jerry', 'lantis', 'jerrylantis@gmail.com', hashedPassword, true, true]
    );

    await pool.query(
      `INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)`,
      ['jerrylantis@gmail.com', 'Alaskan Malamute', 'A chill breed of dogs']
    );

    await pool.query(
      `INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)`,
      ['jerrylantis@gmail.com', 'Moon', "The Moon is planet earth's only star."]
    );

    console.log("Sample data inserted successfully.");
  } catch (err) {
    console.error("Error inserting sample data:", err);
  }
}

async function main() {
  await createTables();
  await insertSampleData();
}

main();