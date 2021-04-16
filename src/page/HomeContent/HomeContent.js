import React from "react";
import Promo from "./Promo/Promo";
import style from "./HomeContent.module.scss";

export default function HomeContent() {
  return (
    <div className={style.container}>
      <Promo />
    </div>
  );
}
