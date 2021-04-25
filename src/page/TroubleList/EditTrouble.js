import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import classNames from "classnames";
import InputSelect from "../../components/InputSelect/InputSelect";
import Styles from "./EditTrouble.module.scss";
import { ChevronLeft } from "../../assets/icons/index";

export default function EditTrouble() {
  const [minutesPass, setMinutesPass] = useState(0);

  useEffect(() => {
    let getDays = moment().format("YYYY MM DD");
    let curentTime = moment().format("YYYY MM DD HH:mm");
    let startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");

    if (curentTime < startDay) {
      getDays = moment(getDays).subtract(1, "days").format("YYYY MM DD");
      startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");
    }

    const ms = Math.abs(new Date(curentTime) - new Date(startDay)) / 1000;
    setMinutesPass(ms / 60);
  }, []);

  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds =
      Math.abs(new Date(dateFuture) - new Date(dateNow)) / 1000;
    if (!dateFuture) {
      const curentTime = moment().format("YYYY MM DD HH:mm");
      diffInMilliSeconds =
        Math.abs(new Date(curentTime) - new Date(dateNow)) / 1000;
    }

    // calculate minutes
    const minutes = diffInMilliSeconds / 60;

    return minutes;
  }

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <Link to={"/trouble-list"} className={Styles.back}>
          <ChevronLeft />
        </Link>
        <span>Edit Trouble List</span>
      </div>
    );
  };

  return <div>{renderHeader()}</div>;
}

const mockData = [
  {
    id: "e88f0953-1143-4bab-914e-ac0ca8b9c746",
    machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
    categoryId: null,
    startTime: "2021-04-23T00:00:00.000Z",
    endTime: null,
    remark: null,
    status: "startup",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-20T05:53:11.965Z",
    updatedAt: "2021-04-20T07:01:44.403Z",
  },
];
