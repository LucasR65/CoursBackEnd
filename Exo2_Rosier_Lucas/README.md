# Exo2_TodoList_Express

API ToDoList simple en Express (architecture MVC).

## Commandes utiles

- `npm install` : installe les dépendances (express, nodemon)
- `npm run dev` : lance le serveur en mode développement (nodemon)
- `npm start` : lance le serveur (node)

## Routes

- GET  /tasks       -> lister les tâches
- POST /tasks       -> ajouter une tâche (JSON { title, description? })
- DELETE /tasks/:id -> supprimer une tâche par id
- DELETE /tasks     -> supprimer toutes les tâches
