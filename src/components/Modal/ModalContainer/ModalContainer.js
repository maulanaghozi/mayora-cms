import React, { useState, useEffect } from "react";
import style from "./ModalContainer.module.scss";
import { WhiteCross } from "../../../assets/image";

export default function ModalContainer(props) {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.close} onClick={props.onClose}>
        <WhiteCross width={20} height={20} />
      </div>
      <div className={style.content_container}>{props.children}</div>
    </div>
  );
}
