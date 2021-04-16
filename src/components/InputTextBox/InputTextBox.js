import React from "react";
import style from "./InputTextBox.module.scss";
import classNames from "classnames";

export default function InputTextBox(props) {
  return (
    <div className={classNames(style.wrapper, props.className)}>
      <textarea
        className={classNames(style.text_box_container, {
          [style.not_resizable]: !props.resizable,
          [props.inputStyle]: props.inputStyle,
        })}
        value={props.value}
        placeholder={props.placeholder}
        name={props.name}
        cols={props.cols}
        rows={props.rows}
        maxLength={props.maxLength}
        onChange={props.onChange}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            if (props.onKeyDown) {
              props.onKeyDown();
            }
          }
        }}
      />
      <span>
        {props.value.length} {"/"} {props.maxLength}
      </span>
    </div>
  );
}
