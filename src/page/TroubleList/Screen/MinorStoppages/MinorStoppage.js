import React, { useState, useEffect } from "react";
import { http } from "../../../../utility/http";
import { TroublelistRadio } from "../../../../components/TroublelistRadio/TroublelistRadio";
import { Directory } from "../../../../components/Directory/Directory";
import Styles from "./MinorStoppage.module.scss";
import { LoadingModal } from "../../../../components/Modal";

export default function IdlingMinorStoppages() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const params = {
      method: "GET",
      path: "category/parent/trouble",
      query: {
        categoryParentId: "0c962c1d-a830-4786-a3d0-e5a46329406e",
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setData(result.payload.results);
      setIsLoading(false);
    } else {
      setData(results);
      setIsLoading(false);
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
                <TroublelistRadio data={params.children} />
              ))}
          </Directory>
        ))}
      </div>
    );
  };

  return (
    <div className={Styles.container}>
      {renderDirectoryParent()}
      {isLoading && <LoadingModal />}
    </div>
  );
}

const results = [
  {
    id: "3c7ec1d2-85bc-4ddb-921c-9a024bcdee4b",
    name: "Minor cleaning",
    categoryParentId: "0c962c1d-a830-4786-a3d0-e5a46329406e",
    categoryLevel: "level3",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-27T02:41:50.273Z",
    updatedAt: "2021-04-27T02:41:50.273Z",
    children: [],
    categories: [
      {
        id: "81dd7231-a9f2-4f49-9884-616eac33514d",
        name: "CIP",
        categoryParentId: "3c7ec1d2-85bc-4ddb-921c-9a024bcdee4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "85d22744-9acd-45bf-84da-de0d79809107",
        name: "Dry cleaning",
        categoryParentId: "3c7ec1d2-85bc-4ddb-921c-9a024bcdee4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
    ],
  },
  {
    id: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
    name: "Minor stop",
    categoryParentId: "0c962c1d-a830-4786-a3d0-e5a46329406e",
    categoryLevel: "level3",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-27T02:41:50.273Z",
    updatedAt: "2021-04-27T02:41:50.273Z",
    children: [],
    categories: [
      {
        id: "01f64b94-e8db-4598-a972-c55d05bbdf1a",
        name: "Ganti product",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "04505104-4a41-4e3c-87b7-cf9903f5516c",
        name: "Gudang penuh",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "11f38e8a-5f4b-4707-8311-66aaab6e571d",
        name: "Penumpukan di cyclone FB",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "16a39eda-7078-4a46-92f6-b210f7f13c3f",
        name: "Blocking di jalur fine return",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "16ba554a-e4b9-4b47-a98b-586db93b1fa3",
        name: "Blocking di fluid bed",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "35998ae1-d582-4ae1-a180-31bde10ed8c0",
        name: "Ganti ukuran nozzle",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "3fd01fe8-5266-4253-ae2c-4a138023781e",
        name: "Shortage liquid",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "4f31a16f-e72c-443c-95e5-314cd1188dba",
        name: "Blocking di secondary cyclone",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "57f0f5ee-7af5-4734-8d17-ea2a5e236383",
        name: "Blocking di bustle",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "7a7df8af-66db-47e0-b233-1f51d90ef87a",
        name: "Release Deposit Bustle",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "8089283b-93bb-47a3-bcd2-92ba9bb81f9d",
        name: "Blocking di primary cyclone",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "a861c73d-e05a-495f-8f4c-362d98f23005",
        name: "Numpuk di sievter",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "bc3d378b-0c68-4227-9fa5-437de7eec545",
        name: "Powder numpuk di fluid bed",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "c09d5531-87b0-43a2-8a19-d50248f2a4e4",
        name: "Shortage RM",
        categoryParentId: "7dbcc6f0-2c5f-4421-9efc-fa62a2d77f4b",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
    ],
  },
  {
    id: "dce9e957-8cb9-4d8b-b7c1-7e9283d830dd",
    name: "Warehouse Problem",
    categoryParentId: "0c962c1d-a830-4786-a3d0-e5a46329406e",
    categoryLevel: "level3",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-27T02:41:50.273Z",
    updatedAt: "2021-04-27T02:41:50.273Z",
    children: [],
    categories: [
      {
        id: "6a296a71-8a39-4468-b803-4774c4621901",
        name: "Gudang penuh",
        categoryParentId: "dce9e957-8cb9-4d8b-b7c1-7e9283d830dd",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "7a399410-566f-41ad-adf3-78085c92e9bb",
        name: "Shortage RM",
        categoryParentId: "dce9e957-8cb9-4d8b-b7c1-7e9283d830dd",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
      {
        id: "a159d5f4-211f-4e2d-a725-d483b2153ca2",
        name: "Shortage Palet",
        categoryParentId: "dce9e957-8cb9-4d8b-b7c1-7e9283d830dd",
        categoryType: "trouble",
        status: "active",
        createdBy: null,
        updatedBy: null,
        unit: "Minute",
        createdAt: "2021-04-27T02:41:50.373Z",
        updatedAt: "2021-04-27T02:41:50.373Z",
      },
    ],
  },
];
