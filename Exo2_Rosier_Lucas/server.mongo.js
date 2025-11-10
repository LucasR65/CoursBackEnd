import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import userRoutes from "./routes/userRoutes.js";

// Ajout Apollo Server
import { ApolloServer, gql } from "apollo-server-express";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Charger swagger.json
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes REST existantes
app.get("/", (req, res) => {
  res.send("API ToDoList avec MongoDB et GraphQL");
});
app.use("/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// -------------------------
// PARTIE GRAPHQL APOLLO
// -------------------------

// Définir le schéma GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Définir les resolvers
const resolvers = {
  Query: {
    hello: () => "Hello GraphQL depuis Apollo Server ",
  },
};

// Créer l’instance Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Démarrer Apollo Server avant d'appliquer comme middleware
await server.start();
server.applyMiddleware({ app });

// -------------------------

app.listen(PORT, () => {
  console.log(` Serveur MongoDB sur http://localhost:${PORT}`);
  console.log(` Swagger : http://localhost:${PORT}/api-docs`);
  console.log(` GraphQL : http://localhost:${PORT}${server.graphqlPath}`);
});
