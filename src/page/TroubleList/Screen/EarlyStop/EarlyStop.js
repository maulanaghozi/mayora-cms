import React, { useState, useEffect } from "react";
import { http } from "../../../../utility/http";
import { TroublelistRadio } from "../../../../components/TroublelistRadio/TroublelistRadio";
import Styles from "./EarlyStop.module.scss";

export default function EarlyStop() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const params = {
      method: "GET",
      path: "category",
      query: {
        categoryParentId: "7d40ce23-7f11-4682-ba19-663ac1baea75",
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setData(result.payload.results);
    } else {
      setData(results);
      console.log("THIS IS ERROR TechnicalBreakDown");
    }
  };

  const renderDirectoryParent = () => {
    return (
      <div>
        <TroublelistRadio data={data} />
      </div>
    );
  };

  return <div className={Styles.container}>{renderDirectoryParent()}</div>;
}

const results = [
  {
    id: "29172cbf-cf20-45f3-8014-0e8c54e4e908",
    name: "Start produksi lebih awal",
    categoryParentId: "7d40ce23-7f11-4682-ba19-663ac1baea75",
    categoryType: "trouble",
    status: "active",
    createdBy: null,
    updatedBy: null,
    unit: "Minute",
    createdAt: "2021-04-27T02:41:50.340Z",
    updatedAt: "2021-04-27T02:41:50.340Z",
    parent: null,
  },
  {
    id: "70d49667-9f2e-4599-8008-2ea4b25b423b",
    name: "Stop produksi lebih awal",
    categoryParentId: "7d40ce23-7f11-4682-ba19-663ac1baea75",
    categoryType: "trouble",
    status: "active",
    createdBy: null,
    updatedBy: null,
    unit: "Minute",
    createdAt: "2021-04-27T02:41:50.340Z",
    updatedAt: "2021-04-27T02:41:50.340Z",
    parent: null,
  },
  {
    id: "87c8c155-4170-4391-b812-e8fc145e8a2c",
    name: "Terlambat stop produksi",
    categoryParentId: "7d40ce23-7f11-4682-ba19-663ac1baea75",
    categoryType: "trouble",
    status: "active",
    createdBy: null,
    updatedBy: null,
    unit: "Minute",
    createdAt: "2021-04-27T02:41:50.340Z",
    updatedAt: "2021-04-27T02:41:50.340Z",
    parent: null,
  },
  {
    id: "e9d6c529-87ab-48fd-9715-6044711b0a03",
    name: "Terlambat start produksi",
    categoryParentId: "7d40ce23-7f11-4682-ba19-663ac1baea75",
    categoryType: "trouble",
    status: "active",
    createdBy: null,
    updatedBy: null,
    unit: "Minute",
    createdAt: "2021-04-27T02:41:50.340Z",
    updatedAt: "2021-04-27T02:41:50.340Z",
    parent: null,
  },
];
