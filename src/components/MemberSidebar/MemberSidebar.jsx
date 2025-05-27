/**
 * Visar sidopanelen för medarbetare där vi kan:
 *  - Filtrera medlemmar per roll
 *  - Välja en specifik medlem för att filtrera uppgifter
 *  - Se antal pågående uppgifter per medlem
 *  - Ta bort en medlem som då återställer tilldelade uppgifter till "Ny uppgift"
 *
 * Properties:
 * - isOpen: styr om sidopanelen är synlig
 * - selectedMember: det id eller roll som är valt
 * - setSelectedMember: funktion som sätter nytt medlem/roll-filter
 * - onReset: funktion som återställer valda filter
 */

import { useState, useEffect } from 'react';
import { onValue, update, remove, get, child } from 'firebase/database';
import { membersRef, assignmentsRef } from '../../firebase/config';
import { formatCategory } from '../../utils/format';
import { useAlert } from "../../hooks/useAlert";
import { useDeleteTask } from "../../hooks/useDeleteTask";

export function MemberSidebar({ isOpen, selectedMember, setSelectedMember, onReset }) {
  const [members, setMembers] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [selectedRole, setSelectedRole] = useState('all');
  const [message, type, showAlert] = useAlert();
  const { resetTasksForMember } = useDeleteTask();

  useEffect(() => {
    onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setMembers([]);
      const array = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
      setMembers(array);
    });
  }, []);

  // Hämtar alla uppgifter och räknar hur många som är pågående per medlem
  useEffect(() => {
    onValue(assignmentsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setTaskCounts({});

      const counts = {};
      for (const task of Object.values(data)) {
        if (task.status === "in-progress" && task.member) {
          counts[task.member] = (counts[task.member] || 0) + 1;
        }
      }
      setTaskCounts(counts);
    });
  }, []);

  // Om "Alla medlemmar" är vald så nollställs rollfiltreringen (Fungerar som återställknappen)
  useEffect(() => {
    if (selectedMember === "all") {
      setSelectedRole("all");
    }
  }, [selectedMember]);

  // Tar bort medlem från databasen och återställer de uppgifter som var tilldelade
  async function handleDeleteMember(memberId) {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;

    await remove(child(membersRef, memberId));
    showAlert(`${member.name} har tagits bort`, "error");

    await resetTasksForMember(memberId);
    if (selectedMember === memberId) {
      setSelectedMember("all");
    }
  }

  // Visar inget om panelen är stängd
  if (!isOpen) return null;

  // Filtrera medlemmar baserat på roll
  const filtered = selectedRole === 'all'
    ? members
    : members.filter((m) => m.category === selectedRole);

  return (
    <aside className="member-sidebar">
      <div className="member-header">
        <h2>Medarbetare</h2>

        <div className="member-roles">
          {['all', 'ux', 'frontend', 'backend'].map((role) => {
            const count =
              role === 'all'
                ? members.length
                : members.filter((m) => m.category === role).length;

            const label =
              role === 'all'
                ? `Alla (${count})`
                : `${role.charAt(0).toUpperCase() + role.slice(1)} (${count})`;

            return (
              <button
                key={role}
                className={selectedRole === role ? 'active' : ''}
                onClick={() => {
                  // Ändrar både lokal visning och skickar filtret uppåt
                  setSelectedRole(role);
                  setSelectedMember(role);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista på filtrerade medlemmar */}
      <div className="member-list-scroll">
        <ul className="member-list">
          {filtered.map((member) => (
            <li key={member.id} className="member-item">
              <div
                className="member-wrapper"
                onClick={() => setSelectedMember(member.id)}
                title={`${member.name} (${formatCategory(member.category)})`}
              >
                <span
                  className={
                    selectedMember === member.id ? 'active member-name' : 'member-name'
                  }
                >
                  {member.name} ({formatCategory(member.category)})
                  {taskCounts[member.id] ? ` (${taskCounts[member.id]})` : ""}
                </span>

                <span
                  className="member-delete"
                  onClick={(e) => {
                    e.stopPropagation(); // förhindrar att klick aktiverar wrappern
                    handleDeleteMember(member.id);
                  }}
                  title="Ta bort medarbetare"
                >
                  🗑️
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Återställ-knapp för att återställa valt filter */}
      <div className="member-reset">
        <button onClick={onReset}>
          Återställ
        </button>
      </div>

      {message && <div className={`toast ${type}`}>{message}</div>}
    </aside>
  );
}
