import React from "react";
import InputSelect from "../InputSelect/InputSelect";
import { capitalize } from "../../utility/utility";
import { field, container_form, select } from "./SendNotifForm.module.scss";

export default function TargetMenu(props) {
  return (
    <div className={container_form}>
      <p className={field}>Target Menu :</p>
      <InputSelect
        className={select}
        defaultValue={
          props.sendCriteria.action
            ? {
                value: props.sendCriteria.action,
                label: capitalize(props.sendCriteria.action),
              }
            : {
                value: "",
                label: "Select Page",
              }
        }
        options={[
          { value: "home", label: "Home" },
          { value: "casting", label: "Casting" },
          { value: "search", label: "Search" },
          { value: "profile", label: "Profile" },
        ]}
        onChange={(selected) =>
          props.setSendCriteria({ action: selected.value })
        }
      />
    </div>
  );
}
