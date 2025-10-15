import TaskModel from "../models/taskModel.js";

export const getTasks = (req, res) => {
  res.json(TaskModel.getAll());
};

export const addTask = (req, res) => {
  const { title, description = "" } = req.body || {};
  if (!title) return res.status(400).json({ error: "Le champ 'title' est obligatoire." });
  const task = TaskModel.add(title, description);
  res.status(201).json(task);
};

export const removeTask = (req, res) => {
  const index = Number(req.params.index);
  if (Number.isNaN(index)) return res.status(400).json({ error: "Index invalide." });
  const ok = TaskModel.remove(index);
  if (!ok) return res.status(404).json({ error: "Index invalide." });
  res.json({ message: "Tâche supprimée." });
};

export const clearTasks = (req, res) => {
  TaskModel.clear();
  res.json({ message: "Toutes les tâches ont été supprimées." });
};
