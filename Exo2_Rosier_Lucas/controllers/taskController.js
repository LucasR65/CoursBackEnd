import TaskModel from "../models/taskModel.js";

export const getTasks = (req, res) => {
  res.json(TaskModel.getAll());
};

export const addTask = (req, res) => {
  const { title, description } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: "Le champ 'title' est obligatoire." });
  }
  const newTask = TaskModel.add(title, description);
  res.status(201).json(newTask);
};

export const removeTask = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }
  const ok = TaskModel.remove(id);
  if (!ok) return res.status(404).json({ error: "Tâche non trouvée." });
  res.json({ message: "Tâche supprimée." });
};

export const clearTasks = (req, res) => {
  TaskModel.clear();
  res.json({ message: "Toutes les tâches ont été supprimées." });
};
