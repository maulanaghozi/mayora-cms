import React from "react";
import style from "./LeftSide.module.scss";

export default function LeftExpandSide(props) {
    const handleDescription = desc => {
        if(desc) {
            return desc
        } else {
            return `There is no descriprion`
        }
    }
    return (
        <div className={style.container}>
            <span>{"Ringkasan :"}</span>
            <p>{handleDescription(props.row.description)}</p>
        </div>
    )
}