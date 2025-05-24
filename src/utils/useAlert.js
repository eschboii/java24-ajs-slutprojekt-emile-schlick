import { useState } from "react";

export function useAlert() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); 

  function showAlert(msg, alertType = "success") {
    setMessage(msg);
    setType(alertType);
    setTimeout(() => {
      setMessage("");
      setType("success");
    }, 1500);
  }

  return [message, type, showAlert];
}
