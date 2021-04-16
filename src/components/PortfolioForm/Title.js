import React from "react";
import InputText from "../InputText/InputText";
import { field, container_form, input_text } from "./PortfolioForm.module.scss";

export default function Title(props) {
  return (
    <div className={container_form}>
      <p className={field}>Title :</p>
      <InputText
        name={"title"}
        placeholder={"E.g. Angelina Poetri untuk Iklan BCA"}
        setValue={(value) => props.setCreateCriteria({ title: value })}
        className={input_text}
        value={props.createCriteria.title}
      />
    </div>
  );
}
