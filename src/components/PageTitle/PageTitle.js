import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import style from "./PageTitle.module.scss";
import BackButton from "./BackButton/BackButton";
import classNames from "classnames";

/**
 *
 * Accepted Properties:
 * @param {Array} title array of string that contain the page titles
 * @param {Array} path array of string that contain the page path
 * @param {Boolean} returnable if true, it will render back button beside the first title
 * @param {String} backTo required when returnable is true, the path when back button is clicked
 */
export default function PageTitle(props) {
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
      {props.returnable ? <BackButton to={props.backTo} /> : null}
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
