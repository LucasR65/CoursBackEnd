import { pool } from "../config/db.pg.js";

export const getTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTask = async (req, res) => {
  const { title, description = "" } = req.body;
  if (!title) return res.status(400).json({ error: "Le champ 'title' est obligatoire." });

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
