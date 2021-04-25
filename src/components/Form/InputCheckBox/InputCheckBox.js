import React, { useState, useEffect } from "react";
import style from "./InputCheckBox.module.scss";
import { CheckBoxChecked } from "../../../assets/image";
import classNames from "classnames";

export default function InputCheckbox(props) {
  const [checked, setChecked] = useState(props.value || 0);

  const onChange = checked => {
    props.onChange(checked);
  };
  useEffect(() => {
    onChange(checked);
  }, [checked]);

  return (
    <>
      <label className={style.label}>
        <input
          type={"checkbox"}
          value={1}
          checked={!!checked}
          onChange={e => {
            if (checked === 0) {
              setChecked(1);
            } else if (checked === 1) {
              setChecked(0);
            }
          }}
        />
        <div className={style.checkbox_container}>
          <div
            className={classNames(style.checkbox, { [style.checked]: checked })}
          >
            {!!checked && <CheckBoxChecked width={20} height={20} />}
          </div>
        </div>
      </label>
      <span className={style.checkbox_text}>{props.label}</span>
    </>
  );
}
