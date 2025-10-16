import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Bienvenue sur l'API ToDoList Express + MongoDB 📝"));
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Serveur sur http://localhost:${PORT}`);
});

export default app;
