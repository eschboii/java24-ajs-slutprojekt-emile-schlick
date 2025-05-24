import { TaskColumn } from "./TaskColumn";

export function TaskBoard({ tasks, filter, sort, selectedCategory, selectedMember }) {
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === "done"
        ? task.status === "finished"
        : filter === "notDone"
        ? task.status !== "finished"
        : true;

    const categoryMatch =
      selectedCategory === "all" || task.category === selectedCategory;

    const memberMatch =
      selectedMember === "all" || task.member === selectedMember;

    return statusMatch && categoryMatch && memberMatch;
  });

  const sortedTasks = filteredTasks.toSorted((a, b) => {
    if (sort === "asc") return a.title.localeCompare(b.title);
    if (sort === "des") return b.title.localeCompare(a.title);
    if (sort === "newest") return b.timestamp.localeCompare(a.timestamp);
    if (sort === "oldest") return a.timestamp.localeCompare(b.timestamp);
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
