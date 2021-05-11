import React, { useState, useEffect } from "react";
import Styles from "./User.module.scss";
import classNames from "classnames";
import { PlusIcon, SearchIcon } from "../../assets/icons";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import SearchBar from "../../components/Form/SearchBar/SearchBar";
import TableUserManagement from "../../components/TableUserManagement/TableUserManagement";
import { http } from "../../utility/http";
import { CustomModal } from "../../components/Modal/CustomModal/CustomModal";
import { InputWithLabel } from "../../components/Form/InputWithLable/InputWithLabel";
import InputCheckBox from "../../components/Form/InputCheckBox/InputCheckBox";

export default function UserManagement() {
  const [roleId, setRoleId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  //Create
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [roleIdCreate, setRoleIdCreate] = useState(null);
  const [machine1, setMachine1] = useState(true);
  const [machine2, setMachine2] = useState(false);

  useEffect(() => {
    getDataUser();
  }, [roleId, keyword]);

  const getDataUser = async () => {
    const query = {};

    if (roleId) query["roleId"] = roleId;
    if (keyword) query["keyword"] = keyword;

    const params = {
      method: "GET",
      path: "user",
      query: query,
    };

    const result = await http(params);

    if (result.code === "success" && result.payload) {
      console.log(result.payload.results);
      setData(result.payload.results);
    } else {
      setData([]);
    }
  };

  const onCreateUser = async () => {
    const data = {
      name: name,
      email: email,
      status: status,
      roleId: roleIdCreate,
      machine1: machine1,
      machine2: machine2,
    };

    const params = {
      method: "POST",
      path: "user",
      data: data,
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload.isSuccess) {
        setName("");
        setEmail("");
        setRoleIdCreate(null);
        setMachine1(true);
        setMachine2(true);
        setModalAddVisible(false);
        getDataUser();
      }
    } else {
      alert("Add User Failed");
    }
  };
  const onEditUser = async id => {};

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>User Management</span>
      </div>
    );
  };

  const renderFillter = () => {
    return (
      <div className={Styles.fillterContainer}>
        <div
          className={Styles.buttonAdd}
          onClick={() => setModalAddVisible(true)}
        >
          <PlusIcon />
          <span>Add New</span>
        </div>
        <div className={Styles.fillter}>
          <InputSelect
            value={roleId}
            className={Styles.inputSelect}
            placeholder={"All Role"}
            options={[
              {
                value: null,
                label: "All Role",
              },
              {
                value: "ROLE-USER-MYR001",
                label: "Administartor",
              },
              {
                value: "ROLE-USER-MYR002",
                label: "Supervisor",
              },
              {
                value: "ROLE-USER-MYR003",
                label: "Operator",
              },
            ]}
            onChange={selected => {
              setRoleId(selected.value);
            }}
          />
          <SearchBar
            className={Styles.search}
            name={"keyword"}
            setValue={keyword => setKeyword(keyword)}
            placeholder={"Search name, email"}
            Icon={SearchIcon}
          />
        </div>
      </div>
    );
  };

  const renderTable = () => {
    return (
      <div className={Styles.table}>
        <TableUserManagement data={data} />
      </div>
    );
  };

  const renderAddNewModal = () => {
    return (
      <CustomModal
        visible={modalAddVisible}
        onClose={() => setModalAddVisible(false)}
        title={"Add User"}
      >
        <InputWithLabel
          label={"Name"}
          value={name}
          setValue={setName}
          name={"name"}
          placeholder={"Name"}
        />
        <InputWithLabel
          label={"Email"}
          value={email}
          setValue={setEmail}
          name={"email"}
          placeholder={"Email"}
        />
        <div>
          <LabelCustom label={"Role"}>
            <InputSelect
              value={roleIdCreate}
              className={Styles.inputSelect}
              placeholder={"Select Role"}
              options={[
                {
                  value: "ROLE-USER-MYR002",
                  label: "Supervisor",
                },
                {
                  value: "ROLE-USER-MYR003",
                  label: "Operator",
                },
              ]}
              onChange={selected => {
                setRoleIdCreate(selected.value);
              }}
            />
          </LabelCustom>
          <LabelCustom label={"Line Type"}>
            <div>
              <InputCheckBox
                className={classNames(Styles.checkbox)}
                value={machine1}
                onChange={value => setMachine1(value)}
                label={"Line 1"}
              />
              <InputCheckBox
                className={classNames(Styles.checkbox)}
                value={machine2}
                onChange={value => setMachine2(value)}
                label={"Line 2"}
              />
            </div>
          </LabelCustom>
        </div>
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalAddVisible(false)}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button onClick={() => onCreateUser()} className={Styles.save}>
            Save
          </button>
        </div>
      </CustomModal>
    );
  };

  const renderEditModal = () => {
    return (
      <CustomModal
        visible={modalEditVisible}
        onClose={() => setModalEditVisible(false)}
        title={"Edit User"}
      ></CustomModal>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderFillter()}
      {renderTable()}
      {renderAddNewModal()}
      {renderEditModal()}
    </div>
  );
}

const LabelCustom = props => {
  return (
    <div>
      <span>{props.label}</span>
      {props.children}
    </div>
  );
};
