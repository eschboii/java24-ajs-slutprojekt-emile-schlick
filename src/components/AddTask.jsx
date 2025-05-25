import { push, update, child } from "firebase/database";
import { assignmentsRef } from "../firebase/config";
import { timestamp } from "../utils/timestamp";
import { useState } from "react";
import { useAlert } from "../hooks/useAlert";

export function AddTask() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("ux");
  const [message, type, showAlert] = useAlert();

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      showAlert("Du måste ange en titel för uppgiften", "error");
      return;
    }

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
    setTitle("");
    setCategory("ux");
    showAlert("Uppgift tillagd", "success");
    event.target.reset(); // denna kan ev. tas bort då vi använder controlled inputs
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

        <select
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
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
