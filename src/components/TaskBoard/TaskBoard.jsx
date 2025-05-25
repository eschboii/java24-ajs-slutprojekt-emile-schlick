import { TaskColumn } from "./TaskColumn";

export function TaskBoard({ tasks, filters, showAlert, onDelete }) {
  const { sort, category, member } = filters;

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch = category === "all" || task.category === category;
    const memberMatch = member === "all" || task.member === member;
    return categoryMatch && memberMatch;
  });

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
