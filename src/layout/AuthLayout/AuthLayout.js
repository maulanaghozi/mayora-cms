import React from "react";
import Styles from "./AuthLayout.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { MayoraLogo, MayoraText } from "../../assets/icons";

export default function AuthLayout(props) {
  return (
    <div className={Styles.container}>
      <div className={Styles.box}>
        <div className={Styles.logo}>
          <MayoraLogo />
          <MayoraText />
        </div>
        <div className={Styles.nameContainer}>
          <span>Manufacturing KPI Dashboard</span>
          <span>PT Torabika Eka Semesta - OEE Creamer Division</span>
        </div>
        {props.children}
        <span className={Styles.footer}>
          Copyright © 2020 PT Torabika Eka Semesta Cikupa
        </span>
      </div>
    </div>
  );
}
