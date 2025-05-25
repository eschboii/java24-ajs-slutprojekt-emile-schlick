import { useState } from "react";
import { push, update, child } from "firebase/database";
import { membersRef } from "../firebase/config";
import { useAlert } from "../hooks/useAlert";

export function TeamMembersForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("ux");
  const [message, type, showAlert] = useAlert();

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      showAlert("Du måste ange ett namn", "error");
      return;
    }

    const newID = push(membersRef).key;
    const newRef = child(membersRef, newID);

    const newMember = {
      name: name.trim(),
      category: role
    };

    update(newRef, newMember);
    setName("");
    setRole("ux");
    showAlert("Medarbetare tillagd", "success");
    event.target.reset(); // kan tas bort om vi litar helt på useState
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

        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="ux">UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <button type="submit">Lägg till</button>
      </form>

      {message && <div className={`toast ${type}`}>{message}</div>}
    </div>
  );
}
