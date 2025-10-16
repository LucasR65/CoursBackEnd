import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Le champ 'title' est obligatoire." });
  const newTask = await Task.create({ title, description });
  res.status(201).json(newTask);
};

export const removeTask = async (req, res) => {
  const { id } = req.params;
  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Tâche non trouvée." });
  res.json({ message: "Tâche supprimée." });
};

export const clearTasks = async (_req, res) => {
  await Task.deleteMany();
  res.json({ message: "Toutes les tâches ont été supprimées." });
};
