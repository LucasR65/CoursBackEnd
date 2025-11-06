// src/config/db.pg.js
import pkg from "pg";
const { Pool } = pkg;

export const connectPG = async () => {
  try {
    // ✅ Le mot de passe doit être une chaîne explicite, pas undefined
    const pool = new Pool({
      connectionString: process.env.PG_URI,
    });

    await pool.connect();
    console.log("PostgreSQL connecté !");
    return pool;
  } catch (error) {
    console.error("Erreur connexion PostgreSQL :", error.message);
    process.exit(1);
  }
};
