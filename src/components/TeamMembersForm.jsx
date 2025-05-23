import { useState } from "react";
import { push, update, child } from "firebase/database";
import { membersRef } from "../firebase/config";

export function TeamMembersForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("ux");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) return;

    const newID = push(membersRef).key;
    const newRef = child(membersRef, newID);

    const newMember = {
      name: name.trim(),
      category: role
    };

    update(newRef, newMember);
    event.target.reset();
    setName("");
    setRole("ux");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lägg till medarbetare</h2>
      <input
        type="text"
        placeholder="Namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="ux">UX</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </select>
      <button>Lägg till</button>
    </form>
  );
}
