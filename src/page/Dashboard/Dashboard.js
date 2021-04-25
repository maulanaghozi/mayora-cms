import React from "react";
import useHeader from "../../hooks/useHeader/useHeader";

import { dashboard_container } from "./Dashboard.module.scss";

export default function Dashboard() {
  useHeader({ title: ["Dashboard"], path: ["/dashboard"] });

  return <div className={dashboard_container}></div>;
}
