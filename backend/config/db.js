const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_ruACVGX16PJy@ep-shy-frog-a1el3psz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => console.error("Database connection error:", err.stack));

module.exports = pool;
