import React from "react";

import InputMiniToggle from "../InputMiniToggle/InputMiniToggle";
import { field, container_form, input } from "./PortfolioForm.module.scss";

export default function Tag(params) {
  return (
    <div className={container_form}>
      <p className={field}>With Description? :</p>
      <InputMiniToggle
        value={params.createCriteria.withDescription ? 1 : 0}
        onChange={value => {
            let withDescription = value === 1 ? true : false;
            params.setCreateCriteria({withDescription});
        }}
      />
    </div>
  )
}