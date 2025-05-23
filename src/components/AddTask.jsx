import { push, update, child } from "firebase/database";
import { assignmentsRef } from "../firebase/config";
import { timestamp } from "../utils/timestamp";
import { useState } from "react";

export function AddTask() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("ux");

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Uppgiftens titel"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="ux">UX</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </select>
      <button>Lägg till uppgift</button>
    </form>
  );
}
