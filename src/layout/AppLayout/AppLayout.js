import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";
import { notification, message } from "antd";
import { throttle } from "throttle-debounce";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";
import { hasToken } from "../../utility/utility";
import { http } from "../../utility/http";
import { WarningIcon } from "../../assets/icons";
import { CustomModal } from "../../components/Modal/CustomModal/CustomModal";
import { InputWithLabel } from "../../components/Form/InputWithLable/InputWithLabel";

import Styles, { app_container } from "./AppLayout.module.scss";
import { Context } from "../../hooks/context";

export default function AppLayout(props) {
  const [path, setPath] = useState([]);
  const [title, setTitle] = useState([]);
  const [adminProfile, setAdminProfile] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [dateSelected, setDateSelected] = useState(moment().unix());
  const [machine, setMachine] = useState({
    machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
    machineName: "Line 1",
  });
  const [category, setCategory] = useState({
    categoryId: "",
    categoryName: "",
  });
  const [troubleId, setTroubleId] = useState("");
  const [profile, setProfile] = useState({
    userId: "",
    name: "Budi Putra",
  });
  const [manualCollection, setManualCollection] = useState({
    categoryId: "",
    value: "",
    shift: "shift1",
    remark: "",
    unit: "",
  });
  const [isOpen, setIsOpen] = useState(windowWidth > 1200);
  const [fromPage, setFromPage] = useState(null);

  //Trouble Notification
  const [lastTroubleId, setLastTroubleId] = useState("");
  const [troubleMachine, setTrroubleMachine] = useState(1);
  const [troubleTime, setTroubleTime] = useState(moment().format("HH:mm"));
  const [modalNewTroubleVisible, setModalNewTroubleVisible] = useState(false);

  //change password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [disabledChange, setDisabledChange] = useState(true);
  const [modalChangePassVisible, setModalChangePassVisible] = useState(false);

  const resizeHandler = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  const throttledResizeHandler = throttle(80, resizeHandler);

  useEffect(() => {
    window.addEventListener("resize", throttledResizeHandler);
    return () => window.removeEventListener("resize", throttledResizeHandler);
  }, []);

  const [fromXL, setFromXL] = useState(windowWidth > 1200);

  useEffect(() => {
    if (windowWidth <= 1200 && fromXL) {
      setFromXL(false);
      setIsOpen(false);
    } else if (windowWidth > 1200 && !fromXL) {
      setFromXL(true);
      setIsOpen(true);
    }
  }, [windowWidth]);

  const getLastTrouble = async () => {
    const isLogin = hasToken();

    const params = {
      method: "GET",
      path: "trouble/last",
    };

    if (isLogin) {
      const result = await http(params);

      if (result && result.code === "success" && result.payload) {
        if (
          result.payload.id !== lastTroubleId &&
          result.payload.status === "downtime" &&
          !result.payload.updatedBy
        ) {
          setTroubleTime(moment(result.payload.startTime).format("HH:mm"));

          if (
            result.payload.machineId === "00f5eafd-89c5-4871-a982-26a8180774c7"
          ) {
            setTrroubleMachine(1);
          } else {
            setTrroubleMachine(2);
          }

          setLastTroubleId(result.payload.id);
        }
      }
    }
  };

  useEffect(() => {
    if (lastTroubleId) {
      openNotification();
      setModalNewTroubleVisible(true);
    }
  }, [lastTroubleId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof getLastTrouble === "function") {
        getLastTrouble();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const openNotification = () => {
    notification.open({
      message: `Line ${troubleMachine}`,
      description: `${troubleTime} | New Trouble`,
      duration: 0,
      icon: <WarningIcon />,
    });
  };

  useEffect(() => {
    if (oldPassword && newPassword && confirmationPassword) {
      if (newPassword === confirmationPassword) {
        setDisabledChange(false);
      }
    }
  }, [oldPassword, newPassword, confirmationPassword]);

  const onChangePassword = async () => {
    const params = {
      method: "PUT",
      path: "authentication/change-password",
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setOldPassword("");
      setNewPassword("");
      setConfirmationPassword("");
      setModalChangePassVisible(false);
      message.success(`Change Password Success`, 5);
    } else {
      message.error(`Change Password Failed`, 5);
    }
  };

  const renderAddNewModal = () => {
    return (
      <CustomModal
        visible={modalChangePassVisible}
        onClose={() => setModalChangePassVisible(false)}
        title={"Change Password"}
      >
        <InputWithLabel
          label={"Current Password"}
          value={oldPassword}
          setValue={setOldPassword}
          name={"current password"}
          placeholder={"Current Password"}
          isPassword={true}
        />
        <InputWithLabel
          label={"New Password"}
          value={newPassword}
          setValue={setNewPassword}
          name={"new password"}
          placeholder={"New Password"}
          isPassword={true}
        />
        <InputWithLabel
          label={"Retype New Password"}
          value={confirmationPassword}
          setValue={setConfirmationPassword}
          name={"confirmation password"}
          placeholder={"Retype New Password"}
          isPassword={true}
        />
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalChangePassVisible(false)}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button
            onClick={() => onChangePassword()}
            className={classNames(Styles.save, {
              [Styles.disabled]: disabledChange,
            })}
          >
            Save
          </button>
        </div>
      </CustomModal>
    );
  };

  return (
    <Context.Provider
      value={{
        setTitle,
        setPath,
        windowWidth,
        windowHeight,
        adminProfile,
        setAdminProfile,
        dateSelected,
        setDateSelected,
        machine,
        setMachine,
        category,
        setCategory,
        troubleId,
        setTroubleId,
        profile,
        setProfile,
        manualCollection,
        setManualCollection,
        fromPage,
        setFromPage,
        modalNewTroubleVisible,
        setModalNewTroubleVisible,
        setModalChangePassVisible,
      }}
    >
      <div className={app_container}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Header path={path} title={title} isOpen={isOpen} />
        <Content isOpen={isOpen} setPath={setPath} setTitle={setTitle}>
          {props.children}
        </Content>
        {renderAddNewModal()}
      </div>
    </Context.Provider>
  );
}
