import React from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { ReactComponent as Chevron } from "../../../assets/chevron_right_grey.svg";

import { container, blue, chevron, grey, text } from "./HeaderPath.module.scss";

export default function HeaderPath(props) {
  return (
    <div className={container}>
      {props.path.map((el, i, arr) => {
        let attributes = {};

        if (i === arr.length - 1 || arr.length === 1) {
          return (
            <div className={classNames(grey, text)} key={i}>
              {/* {props.title[i]} */}
            </div>
          );
        }

        attributes = {
          className: classNames(blue, text),
          to: el,
        };

        return (
          <React.Fragment key={i}>
            {/* <Link {...attributes}>{props.title[i]}</Link>
                            <Chevron className={chevron} height={12} width={6} /> */}
          </React.Fragment>
        );
      })}
    </div>
  );
}
