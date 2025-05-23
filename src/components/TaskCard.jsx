import { child, remove, update, onValue } from "firebase/database";
import { assignmentsRef, membersRef } from "../firebase/config";
import { useEffect, useState } from "react";

export function TaskCard({ id, title, category, status, timestamp, member }) {
  const taskRef = child(assignmentsRef, id);
  const [members, setMembers] = useState([]);
  const [assignedMember, setAssignedMember] = useState(null);

  useEffect(() => {
    onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMembers([]);
        return;
      }
      const array = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
      setMembers(array);
    });
  }, []);

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

  function handleDelete() {
    remove(taskRef);
  }

  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p><strong>Kategori:</strong> {category}</p>
      <p><strong>Skapad:</strong> {timestamp}</p>
      <p><strong>Status:</strong> {status}</p>

      {assignedMember && (
        <p><strong>Tilldelad:</strong> {assignedMember.name} ({assignedMember.category})</p>
      )}


      {status === "new" && (
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
      )}

      {status === "in-progress" && (
        <button onClick={handleFinish}>✅ Markera som klar</button>
      )}


      {status === "finished" && (
        <button onClick={handleDelete}>🗑️ Radera</button>
      )}
    </div>
  );
}
