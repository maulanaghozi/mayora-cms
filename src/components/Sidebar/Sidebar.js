import React from "react";
import classNames from "classnames";

import SidebarHeader from "./SidebarHeader/SidebarHeader";
import SidebarToggler from "./SidebarToggler/SidebarToggler";
import SidebarNav from "./SidebarNav/SidebarNav";

import {
  DashboardIcon,
  CollectionIcon,
  TroubleIcon,
  TargetIcon,
  ReleaseIcon,
  ReportIcon,
  MasterCategoryIcon,
  UserIcon,
} from "../../assets/icons";

import { sidebar_container, open, cover } from "./Sidebar.module.scss";

const navigation = (text, path, icon) => {
  return {
    text: text,
    path: path,
    Icon: icon,
  };
};

const nav = [
  navigation("Dashboard", "/dashboard", DashboardIcon),
  navigation("Trouble List", "/trouble-list", TroubleIcon),
  navigation("Manual Collection", "/manual-collection", CollectionIcon),
  navigation("Target", "/target", TargetIcon),
  navigation("Release", "/release", ReleaseIcon),
  navigation("Report", "/report", ReportIcon),
  navigation("Master Category", "/master-category", MasterCategoryIcon),
  navigation("User", "/user", UserIcon),
];

export default function Sidebar(props) {
  return (
    <React.Fragment>
      <div className={classNames(sidebar_container, props.isOpen ? open : "")}>
        <SidebarHeader isOpen={props.isOpen} />
        {nav.map((param, i) => (
          <SidebarNav
            key={i}
            to={param.path}
            Icon={param.Icon}
            SelectedIcon={param.SelectedIcon}
            text={param.text}
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
          />
        ))}
        <SidebarToggler isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
      </div>
      <div className={classNames(cover, props.isOpen ? open : "")}></div>
    </React.Fragment>
  );
}
