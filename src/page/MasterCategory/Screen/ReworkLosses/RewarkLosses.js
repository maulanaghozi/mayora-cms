import React, { useEffect, useState } from "react";
import { Directory } from "../../../../components/Directory/Directory";
import { CategoryList } from "../../../../components/CategoryList/CategoryList";
import Styles from "./ReworkLosses.module.scss";
import { PlusIcon } from "../../../../assets/icons";
import { http } from "../../../../utility/http";
import { CustomModal } from "../../../../components/Modal/CustomModal/CustomModal";
import InputSelect from "../../../../components/Form/InputSelect/InputSelect";
import { InputWithLabel } from "../../../../components/Form/InputWithLable/InputWithLabel";

export default function RewarkLosses() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [categoryParentId, setCategoryParentId] = useState(null);
  const [categoryType, setCategoryType] = useState(null);
  const [unit, setUnit] = useState(null);
  const [modalIsOpened, setModalIsOpened] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const params = {
      method: "GET",
      path: "category/parent",
      query: {
        categoryParentId: "e679843a-bfce-47ce-8f5c-62526cfd7c22",
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

  const onCreateCategory = () => {
    const data = {
      name: name,
      categoryParentId: categoryParentId,
      categoryType: categoryType,
      unit: unit,
    };

    console.log(data);
    const params = {};

    setModalIsOpened(false);
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
                        <div
                          className={Styles.buttonAdd}
                          onClick={() => {
                            setCategoryParentId(item.id);
                            setModalIsOpened(true);
                          }}
                        >
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

  const renderAddNewModal = () => {
    return (
      <CustomModal
        visible={modalIsOpened}
        onClose={() => setModalIsOpened(false)}
        title={"Add New Catgegory"}
      >
        <InputWithLabel
          label={"Category"}
          value={name}
          setValue={setName}
          name={"name"}
          placeholder={"Category"}
        />

        <div style={{ display: "flex", width: "100%" }}>
          <LabelCustom label={"Unit / Satuan"}>
            <InputSelect
              value={unit}
              className={Styles.inputSelect}
              placeholder={"Select Unit / Satuan"}
              options={[
                {
                  value: "Kg",
                  label: "Kg",
                },
                {
                  value: "Menit",
                  label: "Menit",
                },
                {
                  value: "Kg/h",
                  label: "Kg/h",
                },
              ]}
              onChange={selected => {
                setUnit(selected.value);
              }}
            />
          </LabelCustom>

          <LabelCustom label={"Category Type"}>
            <InputSelect
              value={categoryType}
              className={Styles.inputSelect}
              placeholder={"Select Type"}
              options={[
                {
                  value: "manualcollection",
                  label: "Manual Collection",
                },
                {
                  value: "trouble",
                  label: "Trouble",
                },
              ]}
              onChange={selected => {
                setCategoryType(selected.value);
              }}
            />
          </LabelCustom>
        </div>

        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalIsOpened(false)}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button onClick={() => onCreateCategory()} className={Styles.save}>
            Save
          </button>
        </div>
      </CustomModal>
    );
  };

  return (
    <div className={Styles.container}>
      {renderDirectoryParent()}
      {renderAddNewModal()}
    </div>
  );
}

const LabelCustom = props => {
  return (
    <div className={Styles.labelCustomContainer}>
      <span className={Styles.label}>{props.label}</span>
      {props.children}
    </div>
  );
};

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
    children: [
      {
        id: "387c6f87-2fac-4433-9e95-3f842990c308",
        name: "Reject for recycle",
        categoryParentId: "a6efa0c7-50f7-4816-8f1d-375987f8bd12",
        categoryLevel: "level3",
        createdBy: null,
        updatedBy: null,
        createdAt: "2021-04-25T15:56:58.930Z",
        updatedAt: "2021-04-25T15:56:58.930Z",
        children: [],
        categories: [
          {
            id: "04c0c515-2868-49e7-857f-d8466f536fe3",
            name: "Browning",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "29cabd55-63e3-4557-bc88-22e7f2367c35",
            name: "BD Rendah",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "4ce22c8b-ae74-4c68-897a-4d04828a196f",
            name: "Kemasan sobek/basah",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "7364d3ca-32f4-44c9-879d-015888640925",
            name: "White dots",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "8b927387-bde5-4e76-870f-7030c85e9fe3",
            name: "BP hitam",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "96966adb-9e23-47cb-a843-fe6f7b5b2e34",
            name: "Tinggi foam",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "9c4aa310-4766-47a6-8a3d-14dd032375e9",
            name: "Burning particle/kotor",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "9cdabd70-4181-4dea-afd5-857a2394d596",
            name: "Fat content/Tinggi/rendah",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "a6088c2d-faf3-41bf-8c01-ff8bd275792d",
            name: "Fatty Eyes",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "aa55ad13-bf59-4eac-88c5-39ce6351c2bc",
            name: "Powder yang di hold",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "b100fc16-c8e2-4250-ae3a-c49694188f17",
            name: "Dusty",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "dd7cb510-4302-4743-8c1b-11e67d072cc6",
            name: "Kontaminasi benda asing",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "de167df5-0593-49b8-a220-db882532745b",
            name: "Seduhan gelap",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "de21e632-bf20-47c5-965b-261fd06f1892",
            name: "BD tinggi",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "df2ae1b2-41cb-46c0-b64c-419a63347866",
            name: "Bentuk tidak standar",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "f5def1cc-df54-472d-a3bf-8c1be3c0d75c",
            name: "Rasa tidak normal",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "f9cb8b57-da7b-466d-9b8c-57315ad185d0",
            name: "Stabilitas",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "fd544387-5808-466a-b1d4-91f11385af13",
            name: "Gumpalan powder diluar inner",
            categoryParentId: "387c6f87-2fac-4433-9e95-3f842990c308",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
        ],
      },
    ],
    categories: [],
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
    children: [
      {
        id: "99ad20cb-86b4-4979-8e97-8675603c101a",
        name: "Reprocess",
        categoryParentId: "24e46e49-0c6a-4d46-83a4-63e035f8d47f",
        categoryLevel: "level3",
        createdBy: null,
        updatedBy: null,
        createdAt: "2021-04-25T15:56:58.933Z",
        updatedAt: "2021-04-25T15:56:58.933Z",
        children: [],
        categories: [
          {
            id: "23893c24-abcb-4001-9e42-8edff98c6920",
            name: "Tinggi foam",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "267a791a-b4c2-414b-bd01-a443e79ff477",
            name: "Burning particle/kotor",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "282fe86b-f4d2-48f1-8d61-816fc56a00f4",
            name: "Fat content/Tinggi/rendah",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "3498d695-716e-4a71-86bd-0da0e0d4f131",
            name: "Return Kena OIl",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "45cfd57c-376c-40fe-ae43-a3c1369b2f3c",
            name: "Fatty Eyes",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "49f2d3b9-3680-402f-9558-c7f7422b273c",
            name: "Kontaminasi benda asing",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "53ff2496-6714-4fb2-a5cf-efef64dfcb33",
            name: "White dots",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "54cbf1aa-1c4f-41ea-a248-d3e68ff970a2",
            name: "BP hitam",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "6559e4be-3df9-43f5-8bfb-e25b25074693",
            name: "Browning",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "6665a642-5a82-4043-88be-72bcc8dbcbec",
            name: "Rasa tidak normal",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "96015426-585d-4988-85c9-f238240d83f8",
            name: "Seduhan gelap",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "9d44ef72-9ba6-4af3-997f-7b5338cca389",
            name: "BD tinggi",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "a71389ce-d1de-4ea7-ab34-4b22149ca670",
            name: "BD Rendah",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "ad1768f0-68f3-463f-8904-1ab4ce36ec14",
            name: "Powder yang di hold",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "b37a2024-76e1-4ba7-84fa-1f3a9690ab0d",
            name: "Gumpalan powder diluar inner",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "c0c75ecb-bbff-44d8-93fa-014c2705835b",
            name: "Bentuk tidak standar",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "c992fdb8-1746-4af0-a3ee-34d4080ec021",
            name: "Kemasan sobek/basah",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "cce4806a-dc55-49dd-81c7-19603f61b505",
            name: "Dusty",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "d1fb13b9-e11b-4cc5-86c9-e490d9e86f9c",
            name: "Kemasan Kotor",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "f3bd019f-cb23-48d7-a17d-391e96d57e55",
            name: "Stabilitas",
            categoryParentId: "99ad20cb-86b4-4979-8e97-8675603c101a",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
        ],
      },
    ],
    categories: [],
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
    children: [
      {
        id: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
        name: "Reprocess",
        categoryParentId: "64b92ff5-e110-42e3-b7e1-8109cab3317e",
        categoryLevel: "level3",
        createdBy: null,
        updatedBy: null,
        createdAt: "2021-04-25T15:56:58.933Z",
        updatedAt: "2021-04-25T15:56:58.933Z",
        children: [],
        categories: [
          {
            id: "0f22a8fe-d0b1-4276-9e62-8c060aca30cc",
            name: "Browning",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "12a92222-c80e-4395-83c8-e160d234c601",
            name: "Bentuk tidak standar",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "14dab48f-e688-46b6-a417-b69821bf5206",
            name: "Fatty Eyes",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "1bf60878-01b1-4524-b071-95246b699eb1",
            name: "Powder yang di hold",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "20c6704b-c917-471c-8641-e25e158749d4",
            name: "Rasa tidak normal",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "314ea007-db78-4cb9-b57d-9738f718be2d",
            name: "White dots",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "36a164c4-7bc8-4fa7-8260-34a0a0f6209a",
            name: "Burning particle/kotor",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "48347cfd-f6f8-42b5-bf9f-1e345d5cca96",
            name: "Kemasan sobek/basah",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "490716f6-62c2-4ebe-9399-77f8965eef0d",
            name: "BD tinggi",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "7a54949b-b761-434c-91fd-b1fb4a8f2a1c",
            name: "Stabilitas",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "7bf46e17-e657-4638-a39f-430436326e95",
            name: "BP hitam",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "9b2e13d2-9bd0-4be9-bfb1-2eda5c5edf53",
            name: "Fat content/Tinggi/rendah",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "b8bc9ee3-8dd1-404c-8fa8-26101ced726c",
            name: "Seduhan gelap",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "c48d075e-18cf-4fc3-895a-c4ff80cd9d1c",
            name: "Dusty",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "c72d7c81-0148-430b-8943-b92bae86e3e8",
            name: "Gumpalan powder diluar inner",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "d9e5379c-28eb-4924-a4e3-a011345cb405",
            name: "Tinggi foam",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "ec50cc2c-8b5b-4a2e-89f4-722ff159c4d2",
            name: "Kemasan Kotor",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "f56ecb6c-07e8-4cbf-9ed6-7c61f92b65f6",
            name: "Kontaminasi benda asing",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
          {
            id: "f919b8ea-971e-4e29-aad2-dd83c0532af2",
            name: "BD Rendah",
            categoryParentId: "ecabf0e7-522c-463a-b73b-77e7a47160c6",
            categoryType: "manualcollection",
            status: "active",
            createdBy: null,
            updatedBy: null,
            unit: "Kg",
            createdAt: "2021-04-25T15:56:59.123Z",
            updatedAt: "2021-04-25T15:56:59.123Z",
          },
        ],
      },
    ],
    categories: [],
  },
];
