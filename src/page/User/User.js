import React, { useState } from "react";
import Styles from "./User.module.scss";
import { PlusIcon, SearchIcon } from "../../assets/icons";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import SearchBar from "../../components/Form/SearchBar/SearchBar";
import TableUserManagement from "../../components/TableUserManagement/TableUserManagement";

export default function TroubleList() {
  const [role, setRole] = useState(null);
  const [keyword, setKeyword] = useState("");

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
            value={role}
            className={Styles.inputSelect}
            placeholder={"All Role"}
            options={[
              {
                value: "00f5eafd-89c5-4871-a982-26a8180774c7",
                label: "Supervisor",
              },
              {
                value: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
                label: "Operator",
              },
            ]}
            onChange={selected => {
              setRole(selected.value);
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
        <TableUserManagement />
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
