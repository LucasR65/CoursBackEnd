// config/db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

pool
  .connect()
  .then(() => console.log("✅ Connecté à PostgreSQL"))
  .catch((err) => {
    console.error("❌ Erreur connexion PostgreSQL :", err.message || err);
    process.exit(1);
  });

export default pool;
