from __future__ import annotations
import argparse
from controllers.task_controller import TaskController
from typing import Optional

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(prog="todo", description="Mini CLI ToDoList (MVC, POO)")
    sub = parser.add_subparsers(dest="cmd", required=True)

    # add
    a = sub.add_parser("add", help="Ajouter une tâche")
    a.add_argument("title", help="Titre de la tâche")
    a.add_argument("-d", "--description", default="", help="Description optionnelle")

    # list
    sub.add_parser("list", help="Lister les tâches")


    # remove
    r = sub.add_parser("remove", help="Supprimer une tâche")
    r.add_argument("index", type=int, help="Index de la tâche (0-based)")

    # clear
    sub.add_parser("clear", help="Supprimer toutes les tâches")

    return parser.parse_args()

def main() -> None:
    args = parse_args()
    controller = TaskController()

    if args.cmd == "add":
        task = controller.add_task(args.title, args.description)
        print("Tâche ajoutée:", task)
    elif args.cmd == "list":
        tasks = controller.list_tasks()
        if not tasks:
            print("Aucune tâche.")
            return
        for i, t in enumerate(tasks):
            print(f"[{i}] {t}")
    elif args.cmd == "remove":
        ok = controller.remove_task(args.index)
        print("Tâche supprimée." if ok else "Index invalide.")
    elif args.cmd == "clear":
        controller.clear_tasks()
        print("Toutes les tâches ont été supprimées.")
