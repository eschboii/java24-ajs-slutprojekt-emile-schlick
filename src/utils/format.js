/**
 * Hjälpfunktioner för att formatera text
 * - formatCategory(): formaterar kategorier som visas i UI
 * - formatStatus(): översätter status till svenska ord
 */

// Returnerar "UX" om kategorin är "ux", annars stor bokstav på första
export function formatCategory(cat) {
  return cat === "ux"
    ? "UX"
    : cat.charAt(0).toUpperCase() + cat.slice(1);
}

// Returnerar svensk översättning av statuskod
export function formatStatus(status) {
  return status === "new"
    ? "Ny"
    : status === "in-progress"
    ? "Pågående"
    : status === "finished"
    ? "Färdig"
    : status; // fallback om okänd status
}
