/**
 * Visar en kolumn med uppgifter med specifik status och används tre gånger i TaskBoard:
 *  - en gång för "new"
 *  - en gång för "in-progress"
 *  - en gång för "finished"
 *
 * Properties:
 * - status: statusvärde för kolumn
 * - tasks: alla ofiltrerade uppgifter 
 * - showAlert: funktion som skickas vidare till TaskCard
 * - onDelete: funktion som skickas vidare till TaskCard
 */

import { TaskCard } from "./TaskCard";

export function TaskColumn({ status, tasks, showAlert, onDelete }) {
  // Översättning av interna statusvärden till rubriktext
  const statusName = {
    new: "Ny uppgift",
    "in-progress": "Pågående",
    finished: "Avslutad",
  };

  // Filtrera uppgifterna som tillhör rätt status för kolumn
  const filtered = tasks.filter((t) => t.status === status);

  return (
    <div className="task-column">
      <h2>{statusName[status]}</h2>

      {/* Skapar ett TaskCard för varje uppgift kolumnen */}
      {filtered.map((task) => (
        <TaskCard
          key={task.id}
          {...task} // skickar id, title, category, status, member, timestamp
          showAlert={showAlert}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
