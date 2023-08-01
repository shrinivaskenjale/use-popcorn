import { useEffect } from "react";

export const useKey = (key, callback) => {
  useEffect(() => {
    const keydownHandler = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [callback, key]);
};
