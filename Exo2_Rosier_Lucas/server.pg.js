// server.pg.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectPG } from "./config/db.pg.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import jwt from "jsonwebtoken";

dotenv.config();
connectPG(); // Connexion PostgreSQL

const app = express();
const PORT = process.env.PORT_PG || 5001;

// Charger swagger.pg.json depuis ESM avec require (si tu l'as nommé swagger.pg.json)
const require = createRequire(import.meta.url);
let swaggerDocument;
try {
  swaggerDocument = require("./swagger.pg.json");
} catch (e) {
  // fallback si tu utilises swagger.json
  try {
    swaggerDocument = require("./swagger.json");
  } catch (err) {
    swaggerDocument = null;
    console.warn("Aucun fichier swagger trouvé (swagger.pg.json ou swagger.json).");
  }
}

app.use(cors());
app.use(express.json());

if (swaggerDocument) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API ToDoList Express avec PostgreSQL");
});

// Routes utilisateurs (signup / login / me)
app.use("/api/users", userRoutes);

// Routes tasks (protégées via middleware dans routes/taskRoutes.js)
app.use("/tasks", taskRoutes);


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
  console.log(`Serveur PostgreSQL sur http://localhost:${PORT}`);
  if (swaggerDocument) console.log(`Docs Swagger sur http://localhost:${PORT}/api-docs`);
});
