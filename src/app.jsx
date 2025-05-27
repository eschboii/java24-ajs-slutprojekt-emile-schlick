/**
 * app.jsx kopplar alla andra komponenter och ser till att de renderas i rätt ordning.
 * Den hanterar:
 *  - Hämtning och visning av uppgifter från Firebase
 *  - Filtrering och sortering av uppgifter
 *  - Visning och hantering av sidomenyer
 *  - Formulär för att lägga till uppgifter och medlemmar
 *  - Globala pop-up-meddelanden (toasts)
 */

// Importerar statehantering, firebaseverktyg och funktioner från andra klasser
import { useState } from "react";
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
import { useDeleteTask } from "./hooks/useDeleteTask";

export function App() {
  // Hämtar uppgifter från databasen
  const tasks = useFirebaseData(assignmentsRef);

  // Filterinställningar
  const [filters, setFilters] = useState({
    status: "all",
    sort: "default",
    category: "all",
    member: "all",
  });

  // Toggles för sidomenyerna
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);

  const [message, type, showAlert] = useAlert();
  const { deleteTask } = useDeleteTask(showAlert);

  // Uppdaterar filter beroende på användarens val
  function applyFilter({ filter, sort, category, member }) {
    setFilters((prev) => ({
      ...prev,
      status: filter,
      sort,
      category,
      member,
    }));
  }

  function resetAllFilters() {
    setFilters({
      status: "all",
      sort: "default",
      category: "all",
      member: "all"
    });
  }

  // Returnerar true om något filter är aktivt (för att visa återställ-knappen)
  function hasActiveFilters() {
    return (
      filters.status !== "all" ||
      filters.sort !== "default" ||
      filters.category !== "all" ||
      filters.member !== "all"
    );
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
        onReset={resetAllFilters}
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
        onReset={resetAllFilters}
      />

      <div className="main-content">
        <div className="form-container">
          <AddTask />
          <TeamMembersForm />
        </div>

        {/* Knapp för att återställa alla aktiva filter */}
        <div className="reset-all-section">
          {hasActiveFilters() && (
            <button className="reset-all-button" onClick={resetAllFilters}>
              Återställ alla filter
            </button>
          )}
        </div>

        {/* Renderar alla uppgifter, filtrerade och sorterade */}
        <div className="task-board-wrapper">
          <TaskBoard
            tasks={tasks}
            filters={filters}
            showAlert={showAlert}
            onDelete={deleteTask}
          />
        </div>
      </div>

      {message && <div className={`toast ${type}`}>{message}</div>}
    </>
  );
}
