# Exo2_TodoList_Express

API ToDoList simple en Express (architecture MVC).

## Commandes utiles

- `npm install` : installe les dépendances (express, nodemon)
- `npm run dev:mongo` : lance le serveur avec bdd mongo
- `npm run dev:pg` : lance le serveur avec bdd postgres

## Routes

- GET  /tasks       -> lister les tâches
- POST /tasks       -> ajouter une tâche (JSON { title, description? })
- DELETE /tasks/:id -> supprimer une tâche par id
- DELETE /tasks     -> supprimer toutes les tâches
