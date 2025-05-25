/**
 * Hämtar realtidsdata från Firebase, skickar in en ref till en del av databasen som returnerar datan som en lista med objekt
 *
 * Funktion:
 * - Lyssnar automatiskt på förändringar i databasen
 * - Omvandlar JSON till en array med id + innehåll
 */

import { useState, useEffect } from "react";
import { onValue } from "firebase/database";

export function useFirebaseData(ref) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Startar en prenumeration på databasen
    const unsubscribe = onValue(ref, (snapshot) => {
      const val = snapshot.val();

      // Om ingen data finns, returnera tom lista
      if (!val) {
        setData([]);
        return;
      }

      // Omvandla JSON till en array med id + innehåll
      const parsed = Object.entries(val).map(([id, obj]) => ({
        id,
        ...obj,
      }));

      setData(parsed);
    });

    // Rensa prenumerationen när komponenten tas bort
    return () => unsubscribe();
  }, [ref]);

  return data;
}
