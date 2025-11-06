import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTask = async (req, res) => {
  const { title, description = "" } = req.body;
  if (!title) return res.status(400).json({ error: "Le champ 'title' est obligatoire." });

  try {
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée." });
    res.json({ message: "Tâche supprimée." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "Toutes les tâches ont été supprimées." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
