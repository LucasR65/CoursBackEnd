// routes/taskRoutes.js
import express from "express";
import { getTasks, addTask, removeTask, clearTasks } from "../controllers/taskController.js";

const router = express.Router();
router.get("/", getTasks);
router.post("/", addTask);
router.delete("/:id", removeTask);
router.delete("/", clearTasks);
export default router;
