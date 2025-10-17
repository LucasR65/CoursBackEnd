// controllers/taskController.js
import TaskModel from "../models/taskModel.js";

export const getTasks = async (_req, res) => {
  try {
    const tasks = await TaskModel.getAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, description = "" } = req.body || {};
    if (!title) return res.status(400).json({ error: "Le champ 'title' est obligatoire." });
    const task = await TaskModel.add(title, description);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID invalide." });
    const ok = await TaskModel.remove(id);
    if (!ok) return res.status(404).json({ error: "Tâche introuvable." });
    res.json({ message: "Tâche supprimée." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearTasks = async (_req, res) => {
  try {
    await TaskModel.clear();
    res.json({ message: "Toutes les tâches ont été supprimées." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
