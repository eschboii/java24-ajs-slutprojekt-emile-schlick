import { useState, useEffect } from "react";
import { onValue } from "firebase/database";

export function useFirebaseData(ref) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onValue(ref, (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        setData([]);
        return;
      }

      const parsed = Object.entries(val).map(([id, obj]) => ({
        id,
        ...obj,
      }));

      setData(parsed);
    });

    return () => unsubscribe();
  }, [ref]);

  return data;
}
