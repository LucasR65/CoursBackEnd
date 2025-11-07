# Exo2_TodoList_Express

API ToDoList simple en **Express**, structurée en architecture **MVC**,
avec support **MongoDB**, **PostgreSQL** et documentation **Swagger**.

## Installation

``` bash
npm install
```

## Commandes utiles

  Commande              Description
  --------------------- ------------------------------------------------
  `npm run dev:mongo`   Lance le serveur API connecté à **MongoDB**
  `npm run dev:pg`      Lance le serveur API connecté à **PostgreSQL**
  `npm run dev`         (optionnel) lance le serveur par défaut

## Documentation API (Swagger)

Une fois le serveur lancé :

Accès Swagger :\
**http://localhost:5000/api-docs**

Le fichier `swagger.json` doit se trouver **à la racine du projet** (ou
adapter le chemin selon ton implémentation).

## Routes principales

### Tâches (`/tasks`)

  Méthode                                                      Route          Description
  ------------------------------------------------------------ -------------- ----------------------------
  **GET**                                                      `/tasks`       Récupère toutes les tâches
  **POST**                                                     `/tasks`       Ajoute une tâche
  **Body JSON :** `{ "title": "Texte", "description": "?" }`                  
  **DELETE**                                                   `/tasks/:id`   Supprime une tâche par ID
  **DELETE**                                                   `/tasks`       Supprime toutes les tâches

## Structure du projet

    /
    ├── config/
    │   ├── db.js          # Connexion MongoDB
    │   └── db.pg.js       # Connexion PostgreSQL
    ├── controllers/
    │   └── taskController.js
    ├── models/
    │   └── taskModel.js
    ├── routes/
    │   └── taskRoutes.js
    ├── swagger.json        # Documentation Swagger
    ├── server.mongo.js     # Serveur version MongoDB
    ├── server.pg.js        # Serveur version PostgreSQL
    └── README.md

## Technologies utilisées

-   **Express.js**
-   **MongoDB + Mongoose**
-   **PostgreSQL + pg**
-   **Swagger UI**
-   **Nodemon**
-   **ES Modules (import/export)**

## Exemple de requêtes API

### ➤ Ajouter une tâche (POST)

``` bash
curl -X POST http://localhost:5000/tasks   -H "Content-Type: application/json"   -d '{"title": "Nouvelle tâche"}'
```

### ➤ Récupérer toutes les tâches (GET)

``` bash
curl http://localhost:5000/tasks
```

## Exemple de fichier `.env`

    PORT=5000

    # Mongo
    MONGO_URI=mongodb://localhost:27017/todolist

    # PostgreSQL
    PG_URI=postgres://user:password@localhost:5432/todolist
