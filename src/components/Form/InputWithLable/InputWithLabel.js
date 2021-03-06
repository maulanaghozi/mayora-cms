import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Styles from "./InputWithLabel.module.scss";
import { ChevronRight } from "../../../assets/icons";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

export const InputWithLabel = props => {
  const {
    label,
    styleContainer,
    unit,
    disabled,
    value,
    setValue,
    placeholder,
    onClick,
    isTextarea,
    isHourSelected,
    isPassword,
    name,
  } = props;

  const handleChange = e => {
    if (e.target.name === name) {
      setValue(e.target.value);
    }
  };
  const renderInputText = () => {
    return (
      <div
        className={classNames(Styles.inputContainer, {
          [Styles.disabled]: disabled,
        })}
      >
        <input
          className={Styles.input}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          type={isPassword ? "password" : "text"}
        />
        {unit && <span className={Styles.unit}>{unit}</span>}
      </div>
    );
  };

  const renderClickable = () => {
    return (
      <div
        onClick={() => onClick()}
        className={classNames(
          Styles.inputContainer,
          Styles.disabled,
          Styles.clickable
        )}
      >
        <input
          className={classNames(Styles.input, Styles.clickable)}
          value={value}
          placeholder={placeholder}
          disabled={true}
          name={name}
          onChange={handleChange}
        />
        <ChevronRight />
      </div>
    );
  };

  const renderTextarea = () => {
    return (
      <div
        className={classNames(
          Styles.inputContainer,
          Styles.disabled,
          Styles.clickable
        )}
      >
        <textarea
          className={classNames(Styles.input)}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
        />
      </div>
    );
  };

  const onChangeTime = value => {
    const date = value.format();
    setValue(date);
  };

  const renderInputHour = () => {
    return (
      <TimePicker
        style={{ width: 100 }}
        showSecond={false}
        defaultValue={moment()}
        className="xxx"
        onChange={onChangeTime}
      />
    );
  };

  return (
    <div className={classNames(Styles.container, styleContainer)}>
      <span className={Styles.label}>{label}</span>
      {onClick
        ? renderClickable()
        : isTextarea
        ? renderTextarea()
        : isHourSelected
        ? renderInputHour()
        : renderInputText()}
    </div>
  );
};

InputWithLabel.defaultProps = {
  label: "Label",
  styleContainer: {},
  unit: null,
  disabled: false,
  value: "",
  placeholder: "input here ...",
  onClick: null,
  isTextarea: false,
  name: "",
  isHourSelected: false,
};

InputWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  styleContainer: PropTypes.any,
  unit: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  isTextarea: PropTypes.bool,
  name: PropTypes.string.isRequired,
  isHourSelected: PropTypes.bool,
};
