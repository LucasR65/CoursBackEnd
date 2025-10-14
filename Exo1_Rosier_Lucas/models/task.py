from __future__ import annotations
from dataclasses import dataclass, asdict
from typing import Dict

@dataclass
class Task:
    """Représente une tâche dans la ToDoList."""
    title: str
    description: str = ""
    done: bool = False

    def mark_done(self) -> None:
        self.done = True

    def mark_undone(self) -> None:
        self.done = False

    def to_dict(self) -> Dict:
        return asdict(self)

    @staticmethod
    def from_dict(data: Dict) -> "Task":
        return Task(
            title=data.get("title", ""),
            description=data.get("description", ""),
            done=bool(data.get("done", False)),
        )

    def __str__(self) -> str:
        status = "✅" if self.done else "❌"
        desc = f" - {self.description}" if self.description else ""
        return f"{status} {self.title}{desc}"
