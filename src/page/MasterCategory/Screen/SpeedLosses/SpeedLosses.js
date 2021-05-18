import React, { useEffect, useState } from "react";
import { CategoryList } from "../../../../components/CategoryList/CategoryList";
import { Directory } from "../../../../components/Directory/Directory";
import Styles from "./SpeedLosses.module.scss";
import { PlusIcon } from "../../../../assets/icons";
import { http } from "../../../../utility/http";

export default function SpeedLosses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const params = {
      method: "GET",
      path: "category/parent",
      query: {
        categoryParentId: "c0598cf2-abd8-4b51-a8a3-210cca4363bc",
      },
    };

    const result = await http(params);

    if (result && result.code === "success" && result.payload) {
      setData(result.payload.results);
    } else {
      setData(results);
      console.log("THIS IS ERROR TechnicalBreakDown");
    }
  };

  const renderDirectoryParent = () => {
    return (
      <div>
        {data.map((item, idx) => (
          <Directory name={item.name} key={idx.toString()}>
            {Array.isArray(item.children) &&
              item.children.length > 0 &&
              item.children.map((params, idx) => (
                <Directory name={params.name} key={idx.toString()}>
                  {Array.isArray(params.categories) &&
                    params.categories.length > 0 && (
                      <>
                        <div className={Styles.buttonAdd} onClick={() => {}}>
                          <PlusIcon />
                          <span>Add New Category</span>
                        </div>
                        <CategoryList data={params.categories} />
                      </>
                    )}
                </Directory>
              ))}
          </Directory>
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
    children: [
      {
        id: "659bac05-0be7-4dd8-9e56-bc8c7e1a1865",
        name: "Std parameter/Qty tdk tercapai",
        categoryParentId: "1ae22a86-2358-4bbc-b381-e2aed91cd2d9",
        categoryLevel: "level3",
        createdBy: null,
        updatedBy: null,
        createdAt: "2021-04-25T15:56:58.930Z",
        updatedAt: "2021-04-25T15:56:58.930Z",
        children: [],
        categories: [
          {
            id: "11a7ad0b-d696-443e-8d5b-badbf7b44b17",
            name: "Slow Down (speed Homo L/h)",
            categoryParentId: "659bac05-0be7-4dd8-9e56-bc8c7e1a1865",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg/h",
            createdAt: "2021-04-25T15:56:59.106Z",
            updatedAt: "2021-04-25T15:56:59.106Z",
          },
          {
            id: "a77f092f-80f1-47ac-9a71-f50faf58619e",
            name: "Others",
            categoryParentId: "659bac05-0be7-4dd8-9e56-bc8c7e1a1865",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg/h",
            createdAt: "2021-04-25T15:56:59.106Z",
            updatedAt: "2021-04-25T15:56:59.106Z",
          },
        ],
      },
    ],
  },
];
