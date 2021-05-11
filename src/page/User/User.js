import React, { useState, useEffect } from "react";
import Styles from "./User.module.scss";
import { PlusIcon, SearchIcon } from "../../assets/icons";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import SearchBar from "../../components/Form/SearchBar/SearchBar";
import TableUserManagement from "../../components/TableUserManagement/TableUserManagement";
import { http } from "../../utility/http";

export default function UserManagement() {
  const [roleId, setRoleId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

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
        <div className={Styles.buttonAdd}>
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

  return (
    <div>
      {renderHeader()}
      {renderFillter()}
      {renderTable()}
    </div>
  );
}
