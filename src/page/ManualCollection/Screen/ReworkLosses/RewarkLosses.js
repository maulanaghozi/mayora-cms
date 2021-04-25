import React from "react";
import { Directory } from "../../../../components/Directory/Directory";
import Styles from "./ReworkLosses.module.scss";

export default function RewarkLosses() {
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
    id: "a6efa0c7-50f7-4816-8f1d-375987f8bd12",
    name: "Defect",
    categoryParentId: "e679843a-bfce-47ce-8f5c-62526cfd7c22",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
  {
    id: "24e46e49-0c6a-4d46-83a4-63e035f8d47f",
    name: "Rework 41",
    categoryParentId: "e679843a-bfce-47ce-8f5c-62526cfd7c22",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
  {
    id: "64b92ff5-e110-42e3-b7e1-8109cab3317e",
    name: "Rework 44",
    categoryParentId: "e679843a-bfce-47ce-8f5c-62526cfd7c22",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
];
