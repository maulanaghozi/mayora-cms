import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";
import ReactDatePicker from "react-datepicker";
import { CalendarIcon } from "../../../assets/icons";
import style from "./InputDate.module.scss";

import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

export default function InputDate(props) {
  const [selectedDate, setSelectedDate] = useState(
    props.value ? moment.unix(props.value).toDate() : null
  );

  const { isYearPicker } = props;

  useEffect(() => {
    props.onChange(moment(selectedDate).unix());
  }, [selectedDate]);

  const renderNormalDatePicker = () => {
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
        filterDate={props.filterDate}
        customInput={
          <div
            className={classNames(
              style.date_picker_container,
              props.className,
              {
                [style.disabled]: props.disabled,
              }
            )}
          >
            <div className={style.date_picker}>
              {props.value
                ? moment(selectedDate).format("DD / MM / YYYY")
                : "Select Date"}
            </div>
            <div className={style.calendar_icon}>
              <CalendarIcon />
            </div>
          </div>
        }
      />
    );
  };

  const renderYearPicker = () => {
    return (
      <ReactDatePicker
        selected={selectedDate}
        disabled={props.disabled}
        onChange={date => {
          setSelectedDate(date);
        }}
        maxDate={new Date()}
        placeholderText={"Select Year"}
        shouldCloseOnSelect={true}
        dateFormat="yyyy"
        showYearPicker
        customInput={
          <div
            className={classNames(
              style.date_picker_container,
              props.className,
              {
                [style.disabled]: props.disabled,
              }
            )}
          >
            <div className={style.date_picker}>
              {props.value
                ? moment(selectedDate).format("YYYY")
                : "Select Year"}
            </div>
            <div className={style.calendar_icon}>
              <CalendarIcon />
            </div>
          </div>
        }
      />
    );
  };

  return <>{isYearPicker ? renderYearPicker() : renderNormalDatePicker()}</>;
}
