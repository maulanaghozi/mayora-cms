import React, { useState, useEffect } from "react";
import style from "./InputCheckBox.module.scss";
import { CheckBoxChecked } from "../../../assets/image";
import { CheckboxInputIcon } from "../../../assets/icons";
import classNames from "classnames";

export default function InputCheckbox(props) {
  const [checked, setChecked] = useState(props.value || false);

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
            if (checked === false) {
              setChecked(true);
            } else if (checked === true) {
              setChecked(false);
            }
          }}
        />
        <div className={style.checkbox_container}>
          <div
            className={classNames(style.checkbox, { [style.checked]: checked })}
          >
            {!!checked && <CheckboxInputIcon width={20} height={20} />}
          </div>
        </div>
      </label>
      <span className={style.checkbox_text}>{props.label}</span>
    </>
  );
}
