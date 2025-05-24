import { TaskColumn } from "./TaskColumn";

export function TaskBoard({ tasks, filter, sort, selectedCategory, selectedMember }) {
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === "all" ? true : task.status === filter;

    const categoryMatch =
      selectedCategory === "all" || task.category === selectedCategory;

    const memberMatch =
      selectedMember === "all" || task.member === selectedMember;

    return statusMatch && categoryMatch && memberMatch;
  });

const sortedTasks = filteredTasks.toSorted((a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (sort === "asc") return titleB.localeCompare(titleA, 'sv');
  if (sort === "des") return titleA.localeCompare(titleB, 'sv');
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
