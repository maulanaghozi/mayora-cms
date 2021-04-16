import React from "react";
import classNames from "classnames";
import InputTextBox from "../InputTextBox/InputTextBox";
import style, { field, container_form } from "./SendNotifForm.module.scss";

export default function Title(props) {
  const handleOnChange = (e) => {
    if (e.target.name === "message") {
      props.setSendCriteria({ message: e.target.value });
    }
  };
  return (
    <div className={classNames(container_form, style.message_container)}>
      <p className={classNames(field, style.message_field)}>Short Message :</p>
      <InputTextBox
        className={style.input_text_box}
        inputStyle={style.input}
        value={props.sendCriteria.message}
        placeholder={"Enter message here"}
        name={"message"}
        cols={40}
        rows={4}
        maxLength={250}
        onChange={handleOnChange}
      />
    </div>
  );
}
