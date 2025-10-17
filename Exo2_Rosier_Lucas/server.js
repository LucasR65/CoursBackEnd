import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";  
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("ToDoList API (Postgres)"));

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server on http://localhost:${PORT}`);
});
