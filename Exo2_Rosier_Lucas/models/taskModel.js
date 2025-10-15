import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("./data/tasks.json");

function loadTasks() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8");
}

export default {
  getAll: () => loadTasks(),

  add: (title, description = "") => {
    const tasks = loadTasks();
    const maxId = tasks.reduce((m, t) => Math.max(m, t.id || 0), 0);
    const newTask = { id: maxId + 1, title, description };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
  },

  remove: (id) => {
    const tasks = loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    saveTasks(tasks);
    return true;
  },

  clear: () => {
    saveTasks([]);
  }
};
