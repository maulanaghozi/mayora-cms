import React, { useState, useEffect } from "react";
import PushNotifFilter from "../../components/PushNotifFilter/PushNotifFilter";
import PushNotifTable from "../../components/PushNotifTable/PushNotifTable";
import Pagination from "../../components/Pagination/Pagination";
import useHeader from "../../hooks/useHeader/useHeader";
import { http } from "../../utility/http";
import style from "./Broadcast.module.scss";

export default function PushNotification(props) {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [title, setTitle] = useState("");
  const [sortBy, setSortBy] = useState("updated_at");
  const [order, setOrder] = useState("DESC");
  const [key, setKey] = useState(0);
  const [dataPushNotif, setDataPushNotif] = useState(null);

  const searchCriteria = {
    page,
    rows,
    title,
    sortBy,
    order,
    key,
  };

  const setter = {
    page: setPage,
    rows: setRows,
    title: setTitle,
    sortBy: setSortBy,
    order: setOrder,
    key: setKey,
  };

  const setSearchCriteria = (newCriteria) => {
    for (let key in newCriteria) {
      if (searchCriteria.hasOwnProperty(key)) {
        setter[key](newCriteria[key]);
      }
    }
  };

  const getBroadcast = () => {
    const params = {
      method: "GET",
      path: "notification/notification/broadcast",
      query: {
        page: page,
        rows: rows,
        sortBy: sortBy,
        order: order,
      },
    };

    if (title) {
      params.query.title = title;
    }

    http(params).then((res) => {
      if (res && res.code === "success") {
        setDataPushNotif(res.payload);
      } else {
        console.log(res);
      }
    });
  };

  useEffect(() => {
    getBroadcast();
  }, [page, rows, title, sortBy, order, key]);

  useHeader({
    title: ["Broadcast", "Push Notification"],
    path: ["/broadcast/push-notification", "/broadcast/push-notification"],
  });

  return (
    <React.Fragment>
      <PushNotifFilter
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
      />
      <PushNotifTable
        data={dataPushNotif}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
      />
      <Pagination
        data={dataPushNotif}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
      />
    </React.Fragment>
  );
}
