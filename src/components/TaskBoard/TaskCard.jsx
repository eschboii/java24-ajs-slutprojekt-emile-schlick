import { child, remove, update } from "firebase/database";
import { assignmentsRef, membersRef } from "../../firebase/config";
import { useEffect, useState } from "react";
import { useFirebaseData } from "../../hooks/useFirebaseData";
import { formatCategory, formatStatus } from "../../utils/format";

export function TaskCard({
  id,
  title,
  category,
  status,
  timestamp,
  member,
  showAlert,
  onDelete
}) {
  const taskRef = child(assignmentsRef, id);
  const members = useFirebaseData(membersRef);
  const [assignedMember, setAssignedMember] = useState(null);

  useEffect(() => {
    if (!member) return;
    const m = members.find((m) => m.id === member);
    setAssignedMember(m);
  }, [members, member]);

  function handleAssign(event) {
    const selectedId = event.target.value;
    if (!selectedId) return;
    update(taskRef, { member: selectedId, status: "in-progress" });
  }

  function handleFinish() {
    update(taskRef, { status: "finished" });
  }

  function handleReset() {
    update(taskRef, {
      status: "new",
      member: ""
    });
    showAlert("Uppgift återställd till 'Ny uppgift'", "success");
  }

  function handleUndo() {
    update(taskRef, {
      status: "in-progress"
    });
    showAlert("Uppgift återställd till 'Pågående'", "success");
  }

  function handleDelete() {
    onDelete(id, title);
  }

  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p><strong>Kategori:</strong> {formatCategory(category)}</p>
      <p><strong>Skapad:</strong> {timestamp}</p>
      <p><strong>Status:</strong> {formatStatus(status)}</p>

      {assignedMember && (
        <p>
          <strong>Tilldelad:</strong> {assignedMember.name} ({formatCategory(assignedMember.category)})
        </p>
      )}

      {status === "new" && (
        <>
          <span
            className="task-delete-icon"
            title="Radera uppgift"
            onClick={handleDelete}
          >
            🗑️
          </span>

          <select onChange={handleAssign} defaultValue="">
            <option value="" disabled>Välj medlem</option>
            {members
              .filter((m) => m.category === category)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
          </select>
        </>
      )}

      {status === "in-progress" && (
        <>
          <span
            className="task-reset-icon"
            title="Återställ till ny uppgift"
            onClick={handleReset}
          >
            ⬅️
          </span>
          <div className="task-button-group">
            <button onClick={handleFinish}>✅ Markera som klar</button>
          </div>
        </>
      )}

      {status === "finished" && (
        <>
          <span
            className="task-undo-icon"
            title="Återgå till pågående"
            onClick={handleUndo}
          >
            ↩️
          </span>
          <div className="task-button-group">
            <button onClick={handleDelete}>🗑️ Radera</button>
          </div>
        </>
      )}
    </div>
  );
}
