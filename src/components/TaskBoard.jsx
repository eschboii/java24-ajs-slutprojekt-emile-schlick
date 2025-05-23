import { TaskColumn } from "./TaskColumn";

export function TaskBoard({ tasks, filter, sort }) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.status === "finished";
    if (filter === "notDone") return task.status !== "finished";
    return true;
  });

  const sortedTasks = filteredTasks.toSorted((a, b) => {
    if (sort === "asc") return a.title.localeCompare(b.title);
    if (sort === "des") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div className="task-board">
      <TaskColumn status="new" tasks={sortedTasks} />
      <TaskColumn status="in-progress" tasks={sortedTasks} />
      <TaskColumn status="finished" tasks={sortedTasks} />
    </div>
  );
}
