import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { table_cell, column_action } from "../TroubleTable.module.scss";

export default function Action(props) {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);
  const moreRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    if (
      boxRef.current &&
      !boxRef.current.contains(event.target) &&
      moreRef.current &&
      !moreRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (props.openRow !== props.index && isOpen) {
      setIsOpen(false);
    }
  }, [props.openRow]);

  return (
    <div className={classNames(table_cell, column_action)}>
      <span>Edit</span>
    </div>
  );
}
