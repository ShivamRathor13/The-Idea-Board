const pool = require("../config/db");

async function ensureTableExists() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ideas (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        upvotes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ ideas table ready");
  } catch (err) {
    console.error("❌ Error ensuring table exists:", err.message);
  }
}

const initializeDB = async () => {
  try {
    await ensureTableExists();
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};
async function getAllIdeas() {
  // initializeDB();
  const { rows } = await pool.query(
    "SELECT * FROM ideas ORDER BY created_at DESC"
  );
  return rows;
}

async function addIdea(text) {
  const { rows } = await pool.query(
    "INSERT INTO ideas (text) VALUES ($1) RETURNING *",
    [text]
  );
  return rows[0];
}

async function upvoteIdea(id) {
  const { rows } = await pool.query(
    "UPDATE ideas SET upvotes = upvotes + 1 WHERE id=$1 RETURNING *",
    [id]
  );
  return rows[0];
}

module.exports = { getAllIdeas, addIdea, upvoteIdea, initializeDB };
