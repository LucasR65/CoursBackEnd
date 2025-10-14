# Exercice1-Nom-Prenom

Mini API en ligne de commande (CLI) pour gérer une ToDoList.

## Structure
```
Exercice1-Nom-Prenom/
├── models/
│   └── task.py
├── controllers/
│   └── task_controller.py
├── views/
│   └── cli_view.py
├── main.py
└── README.md
```

## Usage
Installez Python 3.8+ puis depuis la racine du projet:

```bash
# ajouter une tâche
python main.py add "Acheter du pain" -d "Baguette si possible"

# lister
python main.py list

# marquer comme fait (index 0-based)
python main.py done 0

# marquer comme non fait
python main.py undone 0

# supprimer
python main.py remove 0

# supprimer tout
python main.py clear
```

Le stockage est persistant dans `data/tasks.json`.

-- Fin.
