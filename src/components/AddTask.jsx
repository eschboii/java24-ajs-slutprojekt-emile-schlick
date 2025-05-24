import { push, update, child } from "firebase/database";
import { assignmentsRef } from "../firebase/config";
import { timestamp } from "../utils/timestamp";
import { useState } from "react";
import { useAlert } from "../utils/useAlert";

export function AddTask() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("ux");
  const [message, type, showAlert] = useAlert();

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    const newID = push(assignmentsRef).key;
    const newRef = child(assignmentsRef, newID);

    const newTask = {
      title: title.trim(),
      category,
      status: "new",
      timestamp: timestamp(),
      member: ""
    };

    update(newRef, newTask);
    event.target.reset();
    setTitle("");
    setCategory("ux");
    showAlert("Uppgift tillagd");
  }

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <h2>Lägg till uppgift</h2>

        <input
          id="task"
          type="text"
          placeholder="Uppgiftens titel"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <select id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="ux">UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <button>Lägg till</button>
      </form>
      {message && <div className={`toast ${type}`}>{message}</div>}
    </div>
  );
}