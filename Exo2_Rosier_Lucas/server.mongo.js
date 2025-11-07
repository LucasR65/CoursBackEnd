// server.mongo.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Charger swagger.json depuis ESM avec require
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

app.use(cors());
app.use(express.json());

// Swagger à la racine
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("API ToDoList avec MongoDB");
});

app.use("/tasks", taskRoutes);

// Routes publiques utilisateurs
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Serveur sur http://localhost:${PORT}`);
  console.log(`Docs Swagger sur http://localhost:${PORT}/api-docs`);
});
