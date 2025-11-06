import { pool } from "../config/db.pg.js";

export const getAllTasks = async () => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  return result.rows;
};

export const createTask = async (title, description) => {
  const result = await pool.query(
    "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );
  return result.rows[0];
};

export const deleteTask = async (id) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};

export const clearAllTasks = async () => {
  await pool.query("DELETE FROM tasks");
};
