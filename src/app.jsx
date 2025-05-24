import { useState, useEffect } from "react";
import { TeamMembersForm } from "./components/TeamMembersForm";
import { AddTask } from "./components/AddTask";
import { TaskBoard } from "./components/TaskBoard/TaskBoard";
import { assignmentsRef } from "./firebase/config";
import { onValue } from "firebase/database";
import { FilterToggle } from "./components/FilterSidebar/FilterToggle";
import { FilterSidebar } from "./components/FilterSidebar/FilterSidebar";
import { MemberSidebar } from "./components/MemberSidebar/MemberSidebar";
import { MemberToggle } from "./components/MemberSidebar/MemberToggle";

export function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [selectedCategory, setCategory] = useState("all");
  const [selectedMember, setMember] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);

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

  function applyFilter({ filter, sort, category, member }) {
    setFilter(filter);
    setSort(sort);
    setCategory(category);
    setMember(member);
  }

  function resetFilters() {
    setFilter("all");
    setSort("default");
    setCategory("all");
  }

  function resetMemberFilter() {
    setMember("all");
  }

  function hasActiveFilters() {
    return (
      filter !== "all" ||
      sort !== "default" ||
      selectedCategory !== "all" ||
      selectedMember !== "all"
    );
  }

  return (
    <>
      <h1>Scrum Board</h1>

      <FilterToggle
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        isOpen={isFilterOpen}
        hasActive={filter !== "all" || sort !== "default" || selectedCategory !== "all"}
      />
      <MemberToggle
        onClick={() => setIsMemberOpen(!isMemberOpen)}
        isOpen={isMemberOpen}
        hasActive={selectedMember !== "all"}
      />

      <FilterSidebar
        onApply={applyFilter}
        onReset={resetFilters}
        isOpen={isFilterOpen}
      />
      <MemberSidebar
        isOpen={isMemberOpen}
        selectedMember={selectedMember}
        setSelectedMember={setMember}
        onReset={resetMemberFilter}
      />

      <div className="main-content">
        <div className="form-container">
          <AddTask />
          <TeamMembersForm />
        </div>

        <div className="reset-all-section">
          {hasActiveFilters() && (
            <button
              className="reset-all-button"
              onClick={() => {
                resetFilters();
                resetMemberFilter();
              }}
            >
              Återställ alla filter
            </button>
          )}
        </div>

        <div className="task-board-wrapper">
          <TaskBoard
            tasks={tasks}
            filter={filter}
            sort={sort}
            selectedCategory={selectedCategory}
            selectedMember={selectedMember}
          />
        </div>
      </div>

    </>
  );
}
