import { useState, useEffect } from "react";
import { TeamMembersForm } from "./components/TeamMembersForm";
import { AddTask } from "./components/AddTask";
import { TaskFilter } from "./components/TaskFilter";
import { TaskBoard } from "./components/TaskBoard";
import { assignmentsRef } from "./firebase/config";
import { onValue } from "firebase/database";


export function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    onValue(assignmentsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setTasks([]);
        return;
      }
      const parsed = Object.entries(data).map(([id, task]) => ({ id, ...task }));
      setTasks(parsed);
    });
  }, []);

  return (
    <>
      <h1>Scrum Board</h1>
      <TeamMembersForm />
      <AddTask />
      <TaskFilter setFilter={setFilter} setSort={setSort} />
      <TaskBoard tasks={tasks} filter={filter} sort={sort} />
    </>
  );
}
