// models/taskModel.js
import pool from "../config/db.js";

export default {
  getAll: async () => {
    const res = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    return res.rows;
  },

  add: async (title, description = "") => {
    const res = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    return res.rows[0];
  },

  remove: async (id) => {
    const res = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
    return res.rowCount > 0;
  },

  clear: async () => {
    await pool.query("DELETE FROM tasks");
  },
};
