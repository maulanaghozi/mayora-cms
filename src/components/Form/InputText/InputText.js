import React from "react";
import { container, input } from "./InputText.module.scss";
import classNames from "classnames";

export default function InputText(props) {
  const handleChange = e => {
    if (e.target.name === props.name) {
      props.setValue(e.target.value);
    }
  };

  return (
    <div
      className={classNames(container, { [props.className]: props.className })}
      style={props.style}
    >
      <input
        type={"text"}
        placeholder={props.placeholder}
        name={props.name}
        className={input}
        onChange={handleChange}
        onKeyPress={
          typeof props.onKeyPress === "function" ? props.onKeyPress : () => {}
        }
        value={props.value || ""}
      />
    </div>
  );
}
