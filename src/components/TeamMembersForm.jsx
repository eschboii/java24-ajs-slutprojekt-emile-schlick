import { useState } from "react";
import { push, update, child } from "firebase/database";
import { membersRef } from "../firebase/config";
import { useAlert } from "../utils/useAlert";

export function TeamMembersForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("ux");
  const [message, type, showAlert] = useAlert();

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
    showAlert("Medarbetare tillagd");
  }

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <h2>Lägg till medarbetare</h2>

       
        <input
          id="name"
          type="text"
          placeholder="Ange namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ux">UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <button type="submit">Lägg till</button>

        {message && <div className={`toast ${type}`}>{message}</div>}

      </form>
    </div>
  );
}
