import React from "react";
import { NavLink } from "react-router-dom";
import style from "./HeaderDashboard.module.scss";
import classNames from "classnames";

export default function HeaderDashboard(props) {
  if (
    !Array.isArray(props.title) ||
    !Array.isArray(props.path || !(props.title.length === props.path.length))
  ) {
    console.error(
      "Error Page Title Component: title and path properties has to be an Array with same length"
    );
  }

  if (props.returnable && !(props.returnable && props.backTo)) {
    console.error(
      "Error Page Title Component: backTo props must be assigned if returnable is true"
    );
  }

  return (
    <div
      className={classNames(style.container, {
        [props.className]: props.className,
      })}
      style={props.style}
    >
      <div className={classNames({ [style.separator]: props.separatorLine })}>
        {props.title.map((el, i) => (
          <NavLink
            exact={props.exact}
            key={el}
            to={props.path[i]}
            className={style.title}
            activeClassName={style.selected}
          >
            {el}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
