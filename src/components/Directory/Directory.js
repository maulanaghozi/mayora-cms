import React, { useState } from "react";
import PropTypes from "prop-types";
import Styles from "./Directory.module.scss";
import {
  FolderCloseIcon,
  FolderOpenIcon,
  MinusSquareIcon,
  PlusSquareIcon,
} from "../../assets/icons";

export const Directory = props => {
  const [isOpened, setIsOpened] = useState(false);
  const { name } = props;

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.container} onClick={() => setIsOpened(!isOpened)}>
        {isOpened ? <MinusSquareIcon /> : <PlusSquareIcon />}
        {isOpened ? <FolderOpenIcon /> : <FolderCloseIcon />}
        <span>{name}</span>
      </div>
      {isOpened && (
        <div className={Styles.children} style={{ marginLeft: 20 }}>
          {props.children}
        </div>
      )}
    </div>
  );
};

Directory.defaultProps = {
  name: "Label",
};

Directory.propTypes = {
  name: PropTypes.string,
};
