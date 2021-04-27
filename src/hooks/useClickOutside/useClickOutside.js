import { useEffect } from "react";

export const useClickOutside = (refs, callback) => {
  const handleClickOutside = e => {
    if (Array.isArray(refs)) {
      for (let i = 0; i < refs.length; i++) {
        if (refs[i].current && !refs[i].current.contains(e.target)) {
          if (i === refs.length - 1) {
            callback(e);
          } else {
            continue;
          }
        } else {
          break;
        }
      }
    } else {
      if (refs.current && !refs.current.contains(e.target)) {
        callback(e);
      }
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};
