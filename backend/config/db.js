const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/postgres",
});

pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => console.error("Database connection error:", err.stack));

module.exports = pool;
