import React, { useState, useEffect } from "react";
import moment from "moment";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";
import { NewTroubleModal } from "../../components/Modal/NewTrouble/NewTrouble";
import { hasToken } from "../../utility/utility";
import { http } from "../../utility/http";

import { app_container } from "./AppLayout.module.scss";
import { Context } from "../../hooks/context";
import { throttle } from "throttle-debounce";

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
  const [lastTroubleId, setLastTroubleId] = useState("");
  const [modalNewTroubleVisible, setModalNewTroubleVisible] = useState(false);

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
          result.payload.status === "downtime"
        ) {
          console.log({ id: result.payload.id, lastId: lastTroubleId });
          setLastTroubleId(result.payload.id);
        }
      }
    }
  };

  useEffect(() => {
    console.log("[Last trouble] ", lastTroubleId);
    if (lastTroubleId) {
      setModalNewTroubleVisible(true);
    }
  }, [lastTroubleId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof getLastTrouble === "function") {
        getLastTrouble();
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // const renderNewTroubleModal = () => {
  //   return (
  //     <NewTroubleModal
  //       visible={modalNewTroubleVisible}
  //       onClose={() => setModalNewTroubleVisible(false)}
  //       machineId={lastTroubleId}
  //     />
  //   );
  // };

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
      }}
    >
      <div className={app_container}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Header path={path} title={title} isOpen={isOpen} />
        <Content isOpen={isOpen} setPath={setPath} setTitle={setTitle}>
          {props.children}
        </Content>
        {/* {renderNewTroubleModal()} */}
      </div>
    </Context.Provider>
  );
}
