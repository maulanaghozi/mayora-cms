import { useEffect } from "react";

export default function usePolling(callback, timeout) {
  useEffect(() => {
    if (typeof callback === "function") {
      callback();
    }
    const interval = setInterval(() => {
      if (typeof callback === "function") {
        callback();
      }
    }, timeout);

    return () => {
      clearInterval(interval);
    };
  }, []);
}
