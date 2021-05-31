import React, { useContext } from "react";
import classNames from "classnames";
import { Context } from "../../hooks/context";

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

import {
  sidebar_container,
  open,
  cover,
  sidebar_line,
} from "./Sidebar.module.scss";

const navigation = (text, path, icon) => {
  return {
    text: text,
    path: path,
    Icon: icon,
  };
};

const topNav = [navigation("Dashboard", "/dashboard", DashboardIcon)];
const middleNav = [
  navigation("Trouble List", "/trouble-list", TroubleIcon),
  navigation("Manual Collection", "/manual-collection", CollectionIcon),
  navigation("Target", "/target", TargetIcon),
  navigation("Release", "/release", ReleaseIcon),
];
const bottomNavAdmin = [
  navigation("Report", "/report", ReportIcon),
  navigation("Master Category", "/master-category", MasterCategoryIcon),
  navigation("User", "/user", UserIcon),
];

const bottomNav = [
  navigation("Report", "/report", ReportIcon),
  navigation("Master Category", "/master-category", MasterCategoryIcon),
];

export default function Sidebar(props) {
  const globalState = useContext(Context);
  const { adminProfile, modalNewTroubleVisible } = globalState;

  return (
    <React.Fragment>
      <div className={classNames(sidebar_container, props.isOpen ? open : "")}>
        <SidebarHeader isOpen={props.isOpen} />
        {topNav.map((param, i) => (
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
        <div className={classNames(sidebar_line, props.isOpen ? open : "")} />
        {middleNav.map((param, i) => (
          <SidebarNav
            key={i}
            to={param.path}
            Icon={param.Icon}
            SelectedIcon={param.SelectedIcon}
            text={param.text}
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
            redDote={modalNewTroubleVisible}
          />
        ))}
        <div className={classNames(sidebar_line, props.isOpen ? open : "")} />
        {adminProfile && adminProfile.roleId === "ROLE-USER-MYR001"
          ? bottomNavAdmin.map((param, i) => (
              <SidebarNav
                key={i}
                to={param.path}
                Icon={param.Icon}
                SelectedIcon={param.SelectedIcon}
                text={param.text}
                isOpen={props.isOpen}
                setIsOpen={props.setIsOpen}
              />
            ))
          : bottomNav.map((param, i) => (
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
