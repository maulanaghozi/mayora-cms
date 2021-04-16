import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Redirect, Prompt } from "react-router-dom";
import useHeader from "../../hooks/useHeader/useHeader";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loading from "../../components/Loading/Loading";
import SendNotifForm from "../../components/SendNotifForm/SendNotifForm";
import { http } from "../../utility/http";
import style from "./Broadcast.module.scss";

export default function SendPushNotif(props) {
  const [action, setAction] = useState(null);
  const [target, setTarget] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [currentState, setCurrentState] = useState("empty"); //empty, loading, success, error
  const [isModified, setIsModified] = useState(null);
  const [back, setBack] = useState(false);
  const alert = useAlert();

  const sendCriteria = {
    action,
    target,
    title,
    message,
  };

  const setter = {
    action: setAction,
    target: setTarget,
    title: setTitle,
    message: setMessage,
  };

  const setSendCriteria = (newCriteria) => {
    for (let key in newCriteria) {
      if (sendCriteria.hasOwnProperty(key)) {
        setter[key](newCriteria[key]);
      }
    }
  };

  useEffect(() => {
    if (isModified === null) {
      setIsModified(false);
    }

    if (isModified === false) {
      setIsModified(true);
    }
  }, [action, target, title, message]);

  const handleSendNotification = () => {
    setCurrentState("loading");
    const params = {
      method: "PUT",
      path: "notification/notification/send-broadcast",
      data: {
        target_menu: action,
        target_type: target,
        title: title,
        message: message,
      },
    };

    console.log(params);

    http(params).then((res) => {
      if (res && res.code === "success") {
        alert.success("send notification success");
        setCurrentState("success");
      } else {
        alert.error("send notification failed");
        console.log(res);
        setCurrentState("error");
      }
    });
  };

  useHeader({
    title: ["Broadcast", "Push Notification", "Send a Notification"],
    path: [
      "/broadcast/push-notification",
      "/broadcast/push-notification",
      "/broadcast/push-notification/create",
    ],
  });
  return (
    <React.Fragment>
      <PageTitle
        title={["send a notification"]}
        path={["/broadcast/push-notification/create"]}
        returnable={true}
        backTo={"/broadcast/push-notification"}
      />
      <SendNotifForm
        sendCriteria={sendCriteria}
        setSendCriteria={setSendCriteria}
      />
      <footer className={style.footer}>
        <button
          onClick={() => handleSendNotification()}
          className={style.button}
        >
          {currentState === "loading" ? <Loading /> : "SEND"}
        </button>
      </footer>
      {currentState === "success" && (
        <Redirect to={"/broadcast/push-notification"} />
      )}
    </React.Fragment>
  );
}
