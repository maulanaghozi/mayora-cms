import React from "react";
import InputSelect from "../InputSelect/InputSelect";
import { capitalize } from "../../utility/utility";
import { field, container_form, select } from "./SendNotifForm.module.scss";

export default function TargetUser(props) {
  return (
    <div className={container_form}>
      <p className={field}>Target User :</p>
      <InputSelect
        className={select}
        defaultValue={
          props.sendCriteria.target
            ? {
                value: props.sendCriteria.target,
                label: capitalize(props.sendCriteria.target),
              }
            : {
                value: "",
                label: "Select Target User",
              }
        }
        options={[
          { value: "all", label: "All" },
          { value: "talent", label: "Talent" },
          { value: "recruiter", label: "Recruiter" },
        ]}
        onChange={(selected) =>
          props.setSendCriteria({ target: selected.value })
        }
      />
    </div>
  );
}
