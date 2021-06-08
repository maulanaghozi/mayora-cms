import React, { useState, useEffect } from "react";
import { message } from "antd";
import Styles from "./User.module.scss";
import classNames from "classnames";
import { RadioGroup, RadioButton } from "react-radio-buttons";
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
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("active");
  const [roleIdCreate, setRoleIdCreate] = useState(null);
  const [machine1, setMachine1] = useState(true);
  const [machine2, setMachine2] = useState(false);

  //Edit
  const [userEdit, setUserEdit] = useState({
    id: "",
    email: "",
    name: "",
    password: "",
    roleId: "",
    status: "",
    machine1: false,
    machine2: false,
    role: {
      name: "",
    },
  });

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
      setData(result.payload.results);
    } else {
      setData([]);
    }
  };

  const onCreateUser = async () => {
    if (!name) return message.error(`Nama tidak boleh kosong`, 5);
    if (email.length < 6)
      return message.error(`Username minimal 6 karakter `, 5);
    if (password.length < 6)
      return message.error(`Username minimal 6 karakter `, 5);
    if (!roleIdCreate) return message.error(`Role tidak boleh kosong`, 5);
    if (!machine1 && !machine2)
      return message.error(`Pilih minimal 1 Line Type`, 5);

    const data = {
      name: name,
      email: email,
      password: password,
      status: status,
      roleId: roleIdCreate,
      machine1: machine1,
      machine2: machine2,
    };

    if (data.roleId === "ROLE-USER-MYR002") {
      data.machine2 = true;
      data.machine1 = true;
    }

    const params = {
      method: "POST",
      path: "user",
      data: data,
    };

    const result = await http(params);

    if (result && result.code === "success" && result.payload) {
      if (result.payload.isSuccess) {
        resetDataCreate();
        setModalAddVisible(false);
        getDataUser();
      }
    } else {
      alert("Add User Failed");
    }
  };

  const handleOnChangeEdit = newValue => {
    setUserEdit({ ...userEdit, ...newValue });
  };

  const onEditUser = async id => {
    if (userEdit.name) return message.error(`Nama tidak boleh kosong`, 5);
    if (userEdit.email.length < 6)
      return message.error(`Username minimal 6 karakter `, 5);

    if (!userEdit.machine1 && !userEdit.machine2)
      return message.error(`Pilih minimal 1 Line Type`, 5);

    const data = {
      name: userEdit.name,
      email: userEdit.email,
      status: userEdit.status,
      roleId: userEdit.roleId,
      machine1: userEdit.machine1,
      machine2: userEdit.machine2,
    };

    if (userEdit.password) {
      if (userEdit.password.length < 6)
        return message.error(`Username minimal 6 karakter `, 5);
      data.password = userEdit.password;
    }

    if (data.roleId === "ROLE-USER-MYR002") {
      data.machine2 = true;
      data.machine1 = true;
    }

    const params = {
      method: "PUT",
      path: `user/${id}`,
      data: data,
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload.isSuccess) {
        resetDataEdit();
        setModalEditVisible(false);
        getDataUser();
      }
    } else {
      alert("Edit User Failed");
    }
  };

  const resetDataCreate = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRoleIdCreate(null);
    setMachine1(true);
    setMachine2(true);
  };

  const resetDataEdit = () => {
    setUserEdit({
      id: "",
      email: "",
      name: "",
      roleId: "",
      status: "",
      machine1: false,
      machine2: false,
      role: {
        name: "",
      },
    });
  };

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
        <TableUserManagement
          data={data}
          setModalEditVisible={setModalEditVisible}
          setUserEdit={setUserEdit}
        />
      </div>
    );
  };

  const renderAddNewModal = () => {
    return (
      <CustomModal
        visible={modalAddVisible}
        onClose={() => {
          resetDataCreate();
          setModalAddVisible(false);
        }}
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
          label={"Username"}
          value={email}
          setValue={setEmail}
          name={"email"}
          placeholder={"Username"}
        />
        <InputWithLabel
          label={"Password"}
          value={password}
          setValue={setPassword}
          name={"password"}
          placeholder={"Password"}
        />
        <div style={{ display: "flex", width: "100%" }}>
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
          {roleIdCreate !== "ROLE-USER-MYR002" && (
            <LabelCustom label={"Line Type"}>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InputCheckBox
                    className={classNames(Styles.checkbox)}
                    value={machine1}
                    onChange={value => setMachine1(value)}
                    label={"Line 1"}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InputCheckBox
                    className={classNames(Styles.checkbox)}
                    value={machine2}
                    onChange={value => setMachine2(value)}
                    label={"Line 2"}
                  />
                </div>
              </div>
            </LabelCustom>
          )}
        </div>
        <LabelCustom label={"Status"}>
          <RadioGroup
            onChange={val => setStatus(val)}
            value={status}
            horizontal
          >
            <RadioButton pointColor={"#C60808"} value="active">
              Active
            </RadioButton>
            <RadioButton pointColor={"#C60808"} value="inactive">
              Inactive
            </RadioButton>
          </RadioGroup>
        </LabelCustom>
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => {
              resetDataCreate();
              setModalAddVisible(false);
            }}
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
        onClose={() => {
          resetDataEdit();
          setModalEditVisible(false);
        }}
        title={"Edit User"}
      >
        <InputWithLabel
          label={"Name"}
          value={userEdit.name}
          setValue={name => handleOnChangeEdit({ name })}
          name={"name"}
          placeholder={"Name"}
        />
        <InputWithLabel
          label={"Username"}
          value={userEdit.email}
          setValue={email => handleOnChangeEdit({ email })}
          name={"email"}
          placeholder={"Username"}
        />
        <InputWithLabel
          label={"Password"}
          value={userEdit.password}
          setValue={password => handleOnChangeEdit({ password })}
          name={"password"}
          placeholder={"Password"}
        />
        <div style={{ display: "flex", width: "100%" }}>
          <LabelCustom label={"Role"}>
            <InputSelect
              value={userEdit.roleId}
              defaultValue={{
                value: userEdit.roleId,
                label: userEdit.role.name,
              }}
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
                handleOnChangeEdit({ roleId: selected.value });
              }}
            />
          </LabelCustom>
          {userEdit.roleId !== "ROLE-USER-MYR002" && (
            <LabelCustom label={"Line Type"}>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InputCheckBox
                    className={classNames(Styles.checkbox)}
                    value={userEdit.machine1}
                    onChange={value => handleOnChangeEdit({ machine1: value })}
                    label={"Line 1"}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InputCheckBox
                    className={classNames(Styles.checkbox)}
                    value={userEdit.machine2}
                    onChange={value => handleOnChangeEdit({ machine2: value })}
                    label={"Line 2"}
                  />
                </div>
              </div>
            </LabelCustom>
          )}
        </div>
        <LabelCustom label={"Status"}>
          <RadioGroup
            onChange={value => handleOnChangeEdit({ status: value })}
            value={userEdit.status}
            horizontal
          >
            <RadioButton pointColor={"#C60808"} value="active">
              Active
            </RadioButton>
            <RadioButton pointColor={"#C60808"} value="inactive">
              Inactive
            </RadioButton>
          </RadioGroup>
        </LabelCustom>
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => {
              resetDataEdit();
              setModalEditVisible(false);
            }}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button
            onClick={() => onEditUser(userEdit.id)}
            className={Styles.save}
          >
            Save
          </button>
        </div>
      </CustomModal>
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
    <div className={Styles.labelCustomContainer}>
      <span className={Styles.label}>{props.label}</span>
      {props.children}
    </div>
  );
};
