// server.mongo.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import userRoutes from "./routes/userRoutes.js";
import jwt from "jsonwebtoken";

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

// Routes tasks
app.use("/tasks", taskRoutes);

// Routes utilisateurs
app.use("/api/users", userRoutes);


app.get("/accessResource", (req, res) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Error! Token was not provided or Authorization header is malformed."
      });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return res.status(401).json({
        success: false,
        message: "Error! Authorization header malformed."
      });
    }

    const token = parts[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Error! Token was not provided."
      });
    }

    const secret = process.env.JWT_SECRET || "secretkeyappearshere";
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token invalide ou expiré."
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        userId: decodedToken.userId,
        email: decodedToken.email
      }
    });
  } catch (err) {
    console.error("accessResource error:", err);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur sur http://localhost:${PORT}`);
  console.log(`Docs Swagger sur http://localhost:${PORT}/api-docs`);
});
