import React from "react";
import { Directory } from "../../../../components/Directory/Directory";
import Styles from "./DownTimeLosses.module.scss";

export default function DownTimeLosses() {
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
    id: "0c962c1d-a830-4786-a3d0-e5a46329406e",
    name: "Idling & Minor Stoppages",
    categoryParentId: "630af900-a4a9-4746-a6d9-6462eecf0c63",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
  {
    id: "7d40ce23-7f11-4682-ba19-663ac1baea75",
    name: "Late Start/Early Stop",
    categoryParentId: "630af900-a4a9-4746-a6d9-6462eecf0c63",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
  {
    id: "8c29a614-cb5d-4d32-8cb3-082cba07e019",
    name: "Set-Up & Adjustment",
    categoryParentId: "630af900-a4a9-4746-a6d9-6462eecf0c63",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
  {
    id: "a2fe9f30-eede-46b9-a7ad-a4cc3a008175",
    name: "Technical Break Down",
    categoryParentId: "630af900-a4a9-4746-a6d9-6462eecf0c63",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
];
