from __future__ import annotations
from dataclasses import dataclass, asdict
from typing import Dict

@dataclass
class Task:
    """Représente une tâche dans la ToDoList."""
    title: str
    description: str = ""
    def to_dict(self) -> Dict:
        return asdict(self)

    @staticmethod
    def from_dict(data: Dict) -> "Task":
        return Task(
            title=data.get("title", ""),
            description=data.get("description", ""),
        )

    def __str__(self) -> str:
        
        desc = f" - {self.description}" if self.description else ""
        return f"{self.title}{desc}"
