import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectPG } from "./config/db.pg.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectPG(); // Connexion PostgreSQL

const app = express();
const PORT = process.env.PORT_PG || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API ToDoList Express avec PostgreSQL");
});

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Serveur PostgreSQL sur http://localhost:${PORT}`);
});
