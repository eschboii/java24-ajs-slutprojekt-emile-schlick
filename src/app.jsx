import { useState } from "react";
import { child, remove } from "firebase/database";
import { assignmentsRef } from "./firebase/config";
import { TeamMembersForm } from "./components/TeamMembersForm";
import { AddTask } from "./components/AddTask";
import { TaskBoard } from "./components/TaskBoard/TaskBoard";
import { FilterToggle } from "./components/FilterSidebar/FilterToggle";
import { FilterSidebar } from "./components/FilterSidebar/FilterSidebar";
import { MemberSidebar } from "./components/MemberSidebar/MemberSidebar";
import { MemberToggle } from "./components/MemberSidebar/MemberToggle";
import { useAlert } from "./hooks/useAlert";
import { useFirebaseData } from "./hooks/useFirebaseData";

export function App() {
  const tasks = useFirebaseData(assignmentsRef);
  const [filters, setFilters] = useState({
    status: "all",
    sort: "default",
    category: "all",
    member: "all",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [message, type, showAlert] = useAlert();

  function applyFilter({ filter, sort, category, member }) {
    setFilters((prev) => ({
      ...prev,
      status: filter,
      sort,
      category,
      member,
    }));
  }

  function resetFilters() {
    setFilters({
      status: "all",
      sort: "default",
      category: "all",
      member: "all",
    });
  }

  function hasActiveFilters() {
    return (
      filters.status !== "all" ||
      filters.sort !== "default" ||
      filters.category !== "all" ||
      filters.member !== "all"
    );
  }

  async function handleDeleteTask(id, title) {
    const taskRef = child(assignmentsRef, id);
    await remove(taskRef);
    showAlert(`Uppgift "${title}" har tagits bort`, "error");
  }

  return (
    <>
      <h1>Scrum Board</h1>

      <FilterToggle
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        isOpen={isFilterOpen}
        hasActive={
          filters.status !== "all" ||
          filters.sort !== "default" ||
          filters.category !== "all"
        }
      />

      <MemberToggle
        onClick={() => setIsMemberOpen(!isMemberOpen)}
        isOpen={isMemberOpen}
        hasActive={filters.member !== "all"}
      />

      <FilterSidebar
        onApply={applyFilter}
        onReset={() =>
          setFilters((prev) => ({
            ...prev,
            status: "all",
            sort: "default",
            category: "all",
          }))
        }
        isOpen={isFilterOpen}
        filter={filters.status}
        sort={filters.sort}
        category={filters.category}
        member={filters.member}
      />

      <MemberSidebar
        isOpen={isMemberOpen}
        selectedMember={filters.member}
        setSelectedMember={(member) =>
          setFilters((prev) => ({ ...prev, member }))
        }
        onReset={() =>
          setFilters((prev) => ({ ...prev, member: "all" }))
        }
      />

      <div className="main-content">
        <div className="form-container">
          <AddTask />
          <TeamMembersForm />
        </div>

        <div className="reset-all-section">
          {hasActiveFilters() && (
            <button className="reset-all-button" onClick={resetFilters}>
              Återställ alla filter
            </button>
          )}
        </div>

        <div className="task-board-wrapper">
          <TaskBoard
            tasks={tasks}
            filters={filters}
            showAlert={showAlert}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>

      {message && <div className={`toast ${type}`}>{message}</div>}
    </>
  );
}
