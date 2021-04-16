import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

import SearchBar from "../SearchBar/SearchBar";
import AddButton from "../AddButton/AddButton";

import style from "./PushNotifFilter.module.scss";

export default function PushNotifFilter(props) {
  const { searchCriteria, setSearchCriteria } = props;

  return (
    <div className={style.container}>
      <div className={style.filter}>
        <SearchBar
          style={{
            marginLeft: "0",
          }}
          className={style.search}
          name={"keyword"}
          setValue={(title) => setSearchCriteria({ title })}
          placeholder={"Title"}
          Icon={SearchIcon}
          value={searchCriteria.title}
        />
      </div>
      <AddButton
        to={"/broadcast/push-notification/create"}
        text={"Send a Notification"}
      />
    </div>
  );
}
