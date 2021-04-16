import { useEffect } from "react";
import { throttle } from "throttle-debounce";

export default function useWindowSize(props) {
  const resizeHandler = () => {
    props.setWindowWidth(window.innerWidth);
    props.setWindowHeight(window.innerHeight);
  };

  const throttledResizeHandler = throttle(80, resizeHandler);

  useEffect(() => {
    window.addEventListener("resize", throttledResizeHandler);
    return () => window.removeEventListener("resize", throttledResizeHandler);
  }, []);
}
