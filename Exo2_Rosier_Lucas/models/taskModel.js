import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("./data/tasks.json");

function loadTasks() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
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
    const newTask = { title, description };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
  },
  remove: (index) => {
    const tasks = loadTasks();
    if (index < 0 || index >= tasks.length) return false;
    tasks.splice(index, 1);
    saveTasks(tasks);
    return true;
  },
  clear: () => saveTasks([]),
};
