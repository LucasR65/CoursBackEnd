from flask import Flask, jsonify, request
from controllers.task_controller import TaskController

app = Flask(__name__)
controller = TaskController()
@app.route("/")
def home():
    return "Bienvenue sur l'API ToDoList Flask 📝"

@app.route("/tasks", methods=["GET"])
def list_tasks():
    """Retourne la liste des tâches."""
    tasks = [t.to_dict() for t in controller.list_tasks()]
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    """Ajoute une nouvelle tâche."""
    data = request.get_json()
    title = data.get("title")
    description = data.get("description", "")
    if not title:
        return jsonify({"error": "Le champ 'title' est obligatoire."}), 400
    task = controller.add_task(title, description)
    return jsonify(task.to_dict()), 201

@app.route("/tasks/<int:index>", methods=["DELETE"])
def remove_task(index):
    """Supprime une tâche par son index."""
    ok = controller.remove_task(index)
    if ok:
        return jsonify({"message": "Tâche supprimée."})
    return jsonify({"error": "Index invalide."}), 404

@app.route("/tasks", methods=["DELETE"])
def clear_tasks():
    """Supprime toutes les tâches."""
    controller.clear_tasks()
    return jsonify({"message": "Toutes les tâches ont été supprimées."})

if __name__ == "__main__":
    app.run(debug=True)
