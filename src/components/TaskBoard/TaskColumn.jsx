import { TaskCard } from "./TaskCard";

export function TaskColumn({ status, tasks }) {
  const statusName = {
    "new": "Ny uppgift",
    "in-progress": "Pågående",
    "finished": "Avslutad"
  };

  const filtered = tasks.filter((t) => t.status === status);

  return (
    <div className="task-column">
      <h2>{statusName[status]}</h2>
      {filtered.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}
