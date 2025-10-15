import express from "express";
import { getTasks, addTask, removeTask, clearTasks } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.delete("/:index", removeTask); // index-based comme en Python
router.delete("/", clearTasks);

export default router;
