import React from "react";
import InputText from "../InputText/InputText";
import { field, container_form, input_text } from "./SendNotifForm.module.scss";

export default function Title(props) {
  return (
    <div className={container_form}>
      <p className={field}>Title :</p>
      <InputText
        name={"title"}
        placeholder={"Enter title here"}
        setValue={(value) => props.setSendCriteria({ title: value })}
        className={input_text}
        value={props.sendCriteria.title}
      />
    </div>
  );
}
