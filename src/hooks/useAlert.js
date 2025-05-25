/**
 * Hanterar toast-meddelanden 
 *
 * Returnerar:
 * - message: själva meddelandetexten
 * - type: "success" eller "error"
 * - showAlert: funktion för att visa ett nytt meddelande
 */

import { useState } from "react";

export function useAlert() {
  // Meddelandetext som visas i toast
  const [message, setMessage] = useState("");

  // Typ av toast 
  const [type, setType] = useState("success");

  // Funktion som triggar en toast
  function showAlert(msg, alertType = "success") {
    setMessage(msg);
    setType(alertType);

    // Rensa efter 1,5 sekund
    setTimeout(() => {
      setMessage("");
      setType("success");
    }, 1500);
  }

  // Returnerar [message, type, showAlert] 
  return [message, type, showAlert];
}
