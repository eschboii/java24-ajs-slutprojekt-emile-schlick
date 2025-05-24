import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { membersRef } from "../firebase/config";

export function TaskFilter({ setFilter, setSort, setCategory, setMember }) {
  const [members, setMembers] = useState([]);

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

  function resetFilters() {
    setFilter("all");
    setSort("default");
    setCategory("all");
    setMember("all");
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "1rem" }}>
      <div>
        <label>Filter by status:</label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Finished</option>
          <option value="notDone">Not finished</option>
        </select>
      </div>

      <div>
        <label>Filter by category:</label>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="ux">UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      <div>
        <label>Filter by member:</label>
        <select onChange={(e) => setMember(e.target.value)}>
          <option value="all">All</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Sort by:</label>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="des">Title A–Ö</option>
          <option value="asc">Title Ö–A</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div>
        <button onClick={resetFilters}>🔄 Återställ filter</button>
      </div>
    </div>
  );
}

