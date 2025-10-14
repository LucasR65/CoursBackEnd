from __future__ import annotations
import json
from pathlib import Path
from typing import List
from models.task import Task

class TaskController:
    """Gestion des tâches + persistance simple en JSON."""

    def __init__(self, storage_path: str | Path = "data/tasks.json") -> None:
        self.storage_path = Path(storage_path)
        self.storage_path.parent.mkdir(parents=True, exist_ok=True)
        self.tasks: List[Task] = []
        self._load()

    def _load(self) -> None:
        
        if not self.storage_path.exists():
            self.tasks = []
            return
        try:
            with self.storage_path.open("r", encoding="utf-8") as f:
                data = json.load(f)
            self.tasks = [Task.from_dict(item) for item in data]
        except Exception:
            # si fichier corrompu ou illisible, on reset
            self.tasks = []

    def _save(self) -> None:
        with self.storage_path.open("w", encoding="utf-8") as f:
            json.dump([t.to_dict() for t in self.tasks], f, ensure_ascii=False, indent=2)

    def add_task(self, title: str, description: str = "") -> Task:
        task = Task(title=title, description=description)
        self.tasks.append(task)
        self._save()
        return task

    def list_tasks(self) -> List[Task]:
        return list(self.tasks)

    def _valid_index(self, index: int) -> bool:
        return 0 <= index < len(self.tasks)


    def remove_task(self, index: int) -> bool:
        if not self._valid_index(index):
            return False
        self.tasks.pop(index)
        self._save()
        return True

    def clear_tasks(self) -> None:
        self.tasks = []
        self._save()
