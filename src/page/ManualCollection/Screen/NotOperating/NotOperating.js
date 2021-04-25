import React from "react";
import { Directory } from "../../../../components/Directory/Directory";
import Styles from "./NotOperating.module.scss";

export default function NotOperating() {
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
    id: "1bef0792-ae62-4d57-a94b-93b029fa7181",
    name: "Not Operating Day",
    categoryParentId: "545fcd41-52e2-4756-9a12-d0ba0a18036a",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.916Z",
    updatedAt: "2021-04-25T15:56:58.916Z",
  },
  {
    id: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
    name: "Planned Down Time",
    categoryParentId: "4e046f3c-6c72-4093-8bff-d780b6b70648",
    categoryLevel: "level2",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-25T15:56:58.920Z",
    updatedAt: "2021-04-25T15:56:58.920Z",
  },
];
