import { useEffect, useContext } from "react";
import { Context } from "../context";
import { useLocation } from "react-router-dom";

export default function useHeader({ path, title }) {
  const context = useContext(Context);
  const location = useLocation();
  useEffect(() => {
    context.setPath(path);
    context.setTitle(title);
  }, [location.pathname]);
}
