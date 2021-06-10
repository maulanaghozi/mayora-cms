import React, { useEffect, useState } from "react";
import { CategoryList } from "../../../../components/CategoryList/CategoryList";
import { Directory } from "../../../../components/Directory/Directory";
import Styles from "./SpeedLosses.module.scss";
import { PlusIcon } from "../../../../assets/icons";
import { http } from "../../../../utility/http";
import { CustomModal } from "../../../../components/Modal/CustomModal/CustomModal";
import InputSelect from "../../../../components/Form/InputSelect/InputSelect";
import { InputWithLabel } from "../../../../components/Form/InputWithLable/InputWithLabel";

export default function SpeedLosses() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [categoryParentId, setCategoryParentId] = useState(null);
  const [categoryType, setCategoryType] = useState(null);
  const [unit, setUnit] = useState(null);
  const [modalIsOpened, setModalIsOpened] = useState(false);

  //Edit
  const [editModalIsOpened, setEditModalIsOpened] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState({
    id: "",
    name: "",
    categoryParentId: "",
    categoryType: "",
    unit: "",
  });

  //Delete
  const [idDelete, setIdDelete] = useState(null);
  const [nameDelete, setNameDelete] = useState(null);
  const [deleteModalIsOpened, setDeleteModalIsOpened] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const params = {
      method: "GET",
      path: "category/parent/master",
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

  const onCreateCategory = async () => {
    const data = {
      name: name,
      categoryParentId: categoryParentId,
      categoryType: categoryType,
      unit: unit,
    };

    const params = {
      method: "POST",
      path: "category",
      data,
    };

    const result = await http(params);

    if (result && result.code === "success" && result.payload) {
      if (result.payload.isSuccess) {
        setName("");
        getData();
      }
    } else {
      console.log("THIS IS ERROR Create Not Operating");
    }

    setModalIsOpened(false);
  };

  const handleOnChangeEdit = newValue => {
    setCategoryEdit({ ...categoryEdit, ...newValue });
  };

  const onEditCategory = async id => {
    const data = {
      name: categoryEdit.name,
      categoryParentId: categoryEdit.categoryParentId,
      categoryType: categoryEdit.categoryType,
      unit: categoryEdit.unit,
    };

    const params = {
      method: "PUT",
      path: `category/${id}`,
      data: data,
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setCategoryEdit({
        id: "",
        name: "",
        categoryParentId: "",
        categoryType: "",
        unit: "",
      });
      setEditModalIsOpened(false);
      getData();
    } else {
      alert("Edit Category Failed");
    }
  };

  const onDelete = async id => {
    const params = {
      method: "PUT",
      path: `category/disabled/${id}`,
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setIdDelete(null);
      setDeleteModalIsOpened(false);
      setNameDelete(null);
      getData();
    } else {
      alert("Edit Category Failed");
    }
  };

  const renderDirectoryParent = () => {
    return (
      <div>
        {data.map((item, idx) => (
          <Directory name={item.name} id={item.id} key={idx.toString()}>
            {Array.isArray(item.children) &&
              item.children.length > 0 &&
              item.children.map((params, idx) => (
                <Directory
                  name={params.name}
                  id={params.id}
                  key={idx.toString()}
                >
                  {Array.isArray(params.categories) &&
                    params.categories.length > 0 && (
                      <>
                        <div
                          className={Styles.buttonAdd}
                          onClick={() => {
                            setCategoryParentId(params.id);
                            setModalIsOpened(true);
                          }}
                        >
                          <PlusIcon />
                          <span>Add New Category</span>
                        </div>
                        <CategoryList
                          data={params.categories}
                          setEditModalIsOpened={setEditModalIsOpened}
                          setCategoryEdit={setCategoryEdit}
                          setIdDelete={setIdDelete}
                          setNameDelete={setNameDelete}
                        />
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

  const handleLabelCategoryType = label => {
    if (label === "manualcollection") {
      return "Manual Collection";
    } else {
      return "Trouble";
    }
  };

  const renderEditModal = () => {
    return (
      <CustomModal
        visible={editModalIsOpened}
        onClose={() => setEditModalIsOpened(false)}
        title={"Edit Catgegory"}
      >
        <InputWithLabel
          label={"Category"}
          value={categoryEdit.name}
          setValue={name => handleOnChangeEdit({ name })}
          name={"name"}
          placeholder={"Category"}
        />

        <div style={{ display: "flex", width: "100%" }}>
          <LabelCustom label={"Unit / Satuan"}>
            <InputSelect
              value={categoryEdit.unit}
              className={Styles.inputSelect}
              placeholder={"Select Unit / Satuan"}
              defaultValue={{
                value: categoryEdit.unit,
                label: categoryEdit.unit,
              }}
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
                handleOnChangeEdit({ unit: selected.value });
              }}
            />
          </LabelCustom>

          <LabelCustom label={"Category Type"}>
            <InputSelect
              value={categoryEdit.categoryType}
              className={Styles.inputSelect}
              placeholder={"Select Type"}
              defaultValue={{
                value: categoryEdit.categoryType,
                label: handleLabelCategoryType(categoryEdit.categoryType),
              }}
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
                handleOnChangeEdit({ categoryType: selected.value });
              }}
            />
          </LabelCustom>
        </div>

        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setEditModalIsOpened(false)}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button
            onClick={() => onEditCategory(categoryEdit.id)}
            className={Styles.save}
          >
            Save
          </button>
        </div>
      </CustomModal>
    );
  };

  const confirmationDeleteModal = () => {
    return (
      <CustomModal
        visible={deleteModalIsOpened}
        onClose={() => {
          setIdDelete(null);
          setDeleteModalIsOpened(false);
          setNameDelete(null);
        }}
        title={"Confirmation Alert"}
      >
        <span style={{ fontFamily: "roboto" }}>
          Anda yakin untuk hapus category <strong>{nameDelete}</strong> dari
          daftar?
        </span>
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => {
              setIdDelete(null);
              setDeleteModalIsOpened(false);
              setNameDelete(null);
            }}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button onClick={() => onDelete(idDelete)} className={Styles.save}>
            Delete
          </button>
        </div>
      </CustomModal>
    );
  };

  useEffect(() => {
    if (idDelete) {
      setDeleteModalIsOpened(true);
    }
  }, [idDelete]);

  return (
    <div className={Styles.container}>
      {renderDirectoryParent()}
      {renderAddNewModal()}
      {renderEditModal()}
      {confirmationDeleteModal()}
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
