import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());           // autoriser CORS (tunables si besoin)
app.use(express.json());   // parser JSON

// route racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API ToDoList Express 📝");
});

// routes
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`✅ Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
