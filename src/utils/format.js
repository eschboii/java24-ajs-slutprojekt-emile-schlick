export function formatCategory(cat) {
  return cat === "ux"
    ? "UX"
    : cat.charAt(0).toUpperCase() + cat.slice(1);
}

export function formatStatus(status) {
  return status === "new"
    ? "Ny"
    : status === "in-progress"
    ? "Pågående"
    : status === "finished"
    ? "Färdig"
    : status;
}