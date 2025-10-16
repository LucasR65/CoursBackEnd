// src/models/taskModel.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
