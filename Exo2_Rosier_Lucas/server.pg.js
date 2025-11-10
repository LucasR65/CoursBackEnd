// server.pg.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectPG } from "./config/db.pg.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

dotenv.config();
connectPG(); 

const app = express();
const PORT = process.env.PORT_PG || 5001;

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API ToDoList Express avec PostgreSQL");
});

// Routes utilisateurs
app.use("/api/users", userRoutes);

// Routes tasks
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Serveur PostgreSQL sur http://localhost:${PORT}`);
  console.log(`Docs Swagger sur http://localhost:${PORT}/api-docs`);
});
