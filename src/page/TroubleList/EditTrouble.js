import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import { InputWithLabel } from "../../components/Form";
import Styles from "./EditTrouble.module.scss";
import { ChevronLeft } from "../../assets/icons";
import { Context } from "../../hooks/context";
import { http } from "../../utility/http";

export default function EditTrouble() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [remark, setRemark] = useState("");
  const [machineId, setMachineId] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const globalState = useContext(Context);
  const { setCategory, setTroubleId, category, fromPage } = globalState;

  useEffect(() => {
    console.log("this is global ", globalState);
    getStatus();
  }, []);

  const getStatus = async () => {
    const params = {
      method: "GET",
      path: `trouble/${id}`,
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (fromPage !== "selectCategory" && result.payload) {
        if (result.payload.category) {
          setCategory({
            categoryId: result.payload.category.id,
            categoryName: result.payload.category.name,
          });
        } else {
          setCategory({
            categoryId: "",
            categoryName: "",
          });
        }
      }
      setStartTime(result.payload.startTime);
      setEndTime(result.payload.endTime);
      setRemark(result.payload.remark);
      setMachineId(result.payload.machineId);
      setTroubleId(result.payload.id);
    } else {
      console.log(result);
      alert("please contact administrator");
    }
  };

  const handleSave = async () => {
    let categoryId = category.categoryId;

    if (!category || category.categoryId === "" || !category.categoryId) {
      categoryId = null;
    }
    const params = {
      method: "PUT",
      path: `trouble/${id}`,
      data: {
        categoryId: categoryId,
        updatedBy: "Budi Putra",
        remark: remark,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload.isSuccess) {
        history.push({
          pathname: "/trouble-list",
          state: { machineId: machineId },
        });
      }
    } else {
      console.log(result);
      alert("Error");
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
        <div
          onClick={() => {
            history.goBack();
          }}
          className={Styles.back}
        >
          <ChevronLeft />
        </div>
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
        name={"time"}
      />
    );
  };

  const renderDuration = () => {
    return (
      <InputWithLabel
        label={"Duration"}
        value={`${timeDiffCalc(endTime, startTime)}`}
        unit={"Min."}
        disabled={true}
        name={"duration"}
      />
    );
  };

  const renderCategory = () => {
    return (
      <>
        <InputWithLabel
          styleContainer={Styles.select}
          onClick={() =>
            history.push({
              pathname: "/trouble-list/select-category",
            })
          }
          label={"Category"}
          value={category.categoryName}
          name={"category"}
        />
        <span className={Styles.note}>
          {/* {`Technical Break Down / Mechanical / ${category.categoryName}`} */}
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
        name={"remark"}
        setValue={setRemark}
      />
    );
  };

  const renderButton = () => {
    return (
      <div className={Styles.buttonContainer}>
        <button
          onClick={() => history.replace("/trouble-list")}
          className={Styles.cancel}
        >
          Cancel
        </button>
        <button onClick={() => handleSave()} className={Styles.save}>
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
