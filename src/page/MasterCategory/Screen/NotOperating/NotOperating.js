import React from "react";
import { CategoryList } from "../../../../components/CategoryList/CategoryList";
import { Directory } from "../../../../components/Directory/Directory";
import Styles from "./NotOperating.module.scss";

export default function NotOperating() {
  const renderDirectoryParent = () => {
    return (
      <div>
        {results.map((item, idx) => (
          <Directory name={item.name} key={idx.toString()}>
            {Array.isArray(item.categories) && item.categories.length > 0 && (
              <CategoryList data={item.categories} />
            )}
          </Directory>
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
    children: [],
    categories: [
      {
        id: "55a30316-0315-4eee-abc6-9fe68ad0733d",
        name: "No Demand",
        categoryParentId: "1bef0792-ae62-4d57-a94b-93b029fa7181",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:59.000Z",
        updatedAt: "2021-04-25T15:56:59.000Z",
      },
      {
        id: "7d470ffa-3142-422a-b3c2-d0a3d01c35c8",
        name: "Libur hari besar/Nasional",
        categoryParentId: "1bef0792-ae62-4d57-a94b-93b029fa7181",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:59.000Z",
        updatedAt: "2021-04-25T15:56:59.000Z",
      },
    ],
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
    children: [],
    categories: [
      {
        id: "38a04f46-22b5-4787-85a0-f7c6286d6476",
        name: "Trial product (NDP)",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
      {
        id: "479be604-9fce-4b5b-84a5-75e5d9cb13ec",
        name: "Others",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
      {
        id: "50d171fd-df66-4036-bb55-d8e0b73938a3",
        name: "Drycleaning",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
      {
        id: "608bea49-a712-49ca-9542-df84bc0cd787",
        name: "PLN problem terkonfirmasi",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
      {
        id: "7af2627c-1f2e-4bf0-a097-3ca6780132f8",
        name: "Gas problem terkonfirmasi",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
      {
        id: "7cff477e-f9af-434a-abf9-c85c0be5890d",
        name: "Water problem terkonfirmasi",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
      {
        id: "7f2adfe1-0124-403a-8b05-6902f6cef167",
        name: "Change Product",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
      {
        id: "a0ee18a3-20d5-4c92-973c-646197b4b0c7",
        name: "Preventive maintenance",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
      {
        id: "c515584e-a2e8-4a68-9b2b-b7fed484279c",
        name: "CIP",
        categoryParentId: "67a1cc81-5e51-45ca-8daa-68a0e85cdbb3",
        categoryType: "manualcollection",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-25T15:56:58.990Z",
        updatedAt: "2021-04-25T15:56:58.990Z",
      },
    ],
  },
];
