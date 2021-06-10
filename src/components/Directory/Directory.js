import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Styles from "./Directory.module.scss";
import {
  FolderCloseIcon,
  FolderOpenIcon,
  MinusSquareIcon,
  PlusSquareIcon,
} from "../../assets/icons";
import { Context } from "../../hooks/context";
import _ from "lodash";

export const Directory = props => {
  const [isOpened, setIsOpened] = useState(false);
  const { name, id } = props;

  const globalState = useContext(Context);
  const { manualOpens, setManualOpens } = globalState;

  const handleAdd = () => {
    const newManualOpens = [...manualOpens, id];
    setManualOpens(newManualOpens);
  };

  const handleRemove = () => {
    const newManualOpens = _.remove(manualOpens, function (n) {
      return n == id;
    });

    setManualOpens(newManualOpens);
  };

  const handleOnCLick = () => {
    if (isOpened) {
      handleRemove();
      setIsOpened(false);
    } else {
      handleAdd();
      setIsOpened(true);
    }
  };

  const initial = () => {
    const checked = _.findIndex(manualOpens, function (el) {
      return el === id;
    });

    if (checked === -1) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  };

  useEffect(() => {
    initial();
  }, []);

  return (
    <div className={Styles.wrapper}>
      <div
        className={Styles.container}
        onClick={() => {
          handleOnCLick();
        }}
      >
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
