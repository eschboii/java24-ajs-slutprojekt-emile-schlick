/**
 * Hanterar filtrering, sortering och rendering av uppgifterna
 * "Ny", "Pågående", "Färdig", tar emot alla uppgifter och filtreringsinställninga från properties i app
 */

import { TaskColumn } from "./TaskColumn";

export function TaskBoard({ tasks, filters, showAlert, onDelete }) {
  // Filtreringsinställningar
  const { status, sort, category, member } = filters;

  // Filtrerar uppgifter baserat på filterval
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = status === "all" || task.status === status;
    const categoryMatch = category === "all" || task.category === category;
    const memberMatch = member === "all" || task.member === member;
    return statusMatch && categoryMatch && memberMatch;
  });

  // Sorterar filtrerade uppgifter enligt valt sorteringsläge
  const sortedTasks = filteredTasks.toSorted((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    switch (sort) {
      case "title-asc":
        return titleB.localeCompare(titleA, "sv");
      case "title-des":
        return titleA.localeCompare(titleB, "sv");
      case "newest":
        return b.timestamp.localeCompare(a.timestamp);
      case "oldest":
        return a.timestamp.localeCompare(b.timestamp);
      default:
        return 0;
    }
  });

  // Renderar uppgifterna baserat på status
  return (
    <div className="task-board">
      <TaskColumn
        status="new"
        tasks={sortedTasks}
        showAlert={showAlert}
        onDelete={onDelete}
      />
      <TaskColumn
        status="in-progress"
        tasks={sortedTasks}
        showAlert={showAlert}
        onDelete={onDelete}
      />
      <TaskColumn
        status="finished"
        tasks={sortedTasks}
        showAlert={showAlert}
        onDelete={onDelete}
      />
    </div>
  );
}
