import React from "react";
import { Directory } from "../../../../components/Directory/Directory";
import Styles from "./SpeedLosses.module.scss";

export default function SpeedLosses() {
  const renderDirectoryParent = () => {
    return (
      <div>
        {results.map((item, idx) => (
          <Directory name={item.name} key={idx.toString()} />
        ))}
      </div>
    );
  };

  return <div className={Styles.container}>{renderDirectoryParent()}</div>;
}

const results = [
  {
    id: "1ae22a86-2358-4bbc-b381-e2aed91cd2d9",
    name: "Reduced Speed",
    categoryParentId: "c0598cf2-abd8-4b51-a8a3-210cca4363bc",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
];
