import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";
import ReactDatePicker from "react-datepicker";
import { ReactComponent as CalenderIcon } from "../../assets/calendar_icon.svg";
import style from "./InputDate.module.scss";

import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

export default function InputDate(props) {
  const [selectedDate, setSelectedDate] = useState(
    props.value ? moment.unix(props.value).toDate() : null
  );

  useEffect(() => {
    props.onChange(moment(selectedDate).unix());
  }, [selectedDate]);

  return (
    <ReactDatePicker
      selected={selectedDate}
      disabled={props.disabled}
      onChange={date => {
        setSelectedDate(date);
      }}
      placeholderText={"Select Date"}
      shouldCloseOnSelect={true}
      minDate={props.minDate}
      maxDate={props.maxDate}
      customInput={
        <div
          className={classNames(style.date_picker_container, props.className, {
            [style.disabled]: props.disabled,
          })}
        >
          <div className={style.date_picker}>
            {props.value
              ? moment(selectedDate).format("DD / MM / YYYY")
              : "Select Date"}
          </div>
          <div className={style.calendar_icon}>
            <CalenderIcon />
          </div>
        </div>
      }
    />
  );
}
