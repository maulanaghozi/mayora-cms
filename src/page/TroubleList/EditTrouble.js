import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import { InputWithLabel } from "../../components/Form";
import Styles from "./EditTrouble.module.scss";
import { ChevronLeft } from "../../assets/icons";
import { http } from "../../utility/http";

export default function EditTrouble() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [categoryName, setCategoryName] = useState("");
  const [remark, setRemark] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const params = {
      method: "GET",
      path: `trouble/${id}`,
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setStartTime(result.payload.startTime);
      setEndTime(result.payload.endTime);
      setCategoryName(result.payload.category.name);
      setRemark(result.payload.remark);
    } else {
      console.log(result);
      alert("please contact administrator");
    }
  };

  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds =
      Math.abs(new Date(dateFuture) - new Date(dateNow)) / 1000;
    if (!dateFuture) {
      const curentTime = moment().format("YYYY MM DD HH:mm");
      diffInMilliSeconds =
        Math.abs(new Date(curentTime) - new Date(dateNow)) / 1000;
    }

    // calculate minutes
    const minutes = Math.round(Number(diffInMilliSeconds / 60));

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

  const renderInputTime = () => {
    return (
      <InputWithLabel
        label={"Time"}
        value={`${moment(startTime).format("HH:mm")} - ${
          endTime ? moment(endTime).format("HH:mm") : "Now"
        }`}
        disabled={true}
      />
    );
  };

  const renderDuration = () => {
    return (
      <InputWithLabel
        label={"Time"}
        value={timeDiffCalc(endTime, startTime)}
        unit={"Min."}
        disabled={true}
      />
    );
  };

  const renderCategory = () => {
    return (
      <>
        <InputWithLabel
          styleContainer={Styles.select}
          onClick={() => history.push("/trouble-list/select-category")}
          label={"Category"}
          value={categoryName}
        />
        <span className={Styles.note}>
          {`Technical Break Down / Mechanical / ${categoryName}`}
        </span>
      </>
    );
  };

  const renderRemark = () => {
    return (
      <InputWithLabel
        styleContainer={Styles.remark}
        label={"Remark"}
        value={remark}
        isTextarea={true}
        placeholder={"Write remak here"}
      />
    );
  };

  const renderButton = () => {
    return (
      <div className={Styles.buttonContainer}>
        <button
          onClick={() => history.push("/trouble-list")}
          className={Styles.cancel}
        >
          Cancel
        </button>
        <button
          onClick={() => history.push("/trouble-list")}
          className={Styles.save}
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div>
      {renderHeader()}
      <div className={Styles.mainContent}>
        {renderInputTime()}
        {renderDuration()}
        {renderCategory()}
        {renderRemark()}
        {renderButton()}
      </div>
    </div>
  );
}
