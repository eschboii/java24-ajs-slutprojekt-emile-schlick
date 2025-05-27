/**
 * Returnerar funktioner för att hantera borttagning och återställning av uppgifter från Firebase.
 */
import { child, remove, update, get } from "firebase/database";
import { assignmentsRef } from "../firebase/config";

export function useDeleteTask(showAlert) {
  async function deleteTask(id, title) {
    const taskRef = child(assignmentsRef, id);
    await remove(taskRef);
    showAlert(`Uppgift "${title}" har tagits bort`, "error");
  }

  // Återställer alla uppgifter som är tilldelade en viss medlem
  async function resetTasksForMember(memberId) {
    const snapshot = await get(assignmentsRef);
    const tasks = snapshot.val();
    if (!tasks) return;

    Object.entries(tasks).forEach(([taskId, task]) => {
      if (task.member === memberId) {
        const taskRef = child(assignmentsRef, taskId);
        update(taskRef, {
          status: "new",
          member: ""
        });
      }
    });
  }

  return { deleteTask, resetTasksForMember };
}
