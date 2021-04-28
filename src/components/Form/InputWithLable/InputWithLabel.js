import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Styles from "./InputWithLabel.module.scss";
import { ChevronRight } from "../../../assets/icons";

export const InputWithLabel = props => {
  const {
    label,
    styleContainer,
    unit,
    disabled,
    value,
    placeholder,
    onClick,
    isTextarea,
  } = props;
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
        />
      </div>
    );
  };
  return (
    <div className={classNames(Styles.container, styleContainer)}>
      <span className={Styles.label}>{label}</span>
      {onClick
        ? renderClickable()
        : isTextarea
        ? renderTextarea()
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
};

InputWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  styleContainer: PropTypes.object,
  unit: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  isTextarea: PropTypes.bool,
};
