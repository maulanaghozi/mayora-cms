import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "./ProductionOutputPlanning.module.scss";
import { ChevronDownFill, ChevronUpFill } from "../../assets/icons";

export const ProductionPlanning = props => {
  const { styleContainer, machineName, target, actual, status } = props;

  const renderMain = () => {
    return (
      <div className={Styles.container}>
        <div className={Styles.headerStatus}>
          <span>Production Planning</span>
        </div>
        {renderDisplay()}
      </div>
    );
  };

  const colorDifferential = status => {
    switch (status) {
      case true:
        return "#0AC46B";
      case false:
        return "#E92548";
      default:
        return "#212121";
    }
  };

  const backgroundStatus = status => {
    switch (status) {
      case "off":
        return "#9e9e9e";
      case "startup":
        return "#FABB43";
      case "running":
        return "#0AC46B";
      case "downtime":
        return "#E92548";
      case "disconnected":
        return "#000000";
      default:
        return "#ffffff";
    }
  };

  const renderDisplay = () => {
    return (
      <div className={Styles.mainContainer}>
        <div className={classNames(Styles.dataWrapper, Styles.type)}>
          <span>Type</span>
          <h1 className={Styles.type}>{machineName}</h1>
        </div>
        <div className={Styles.dataWrapper} style={{ marginBottom: 16 }}>
          <span>Target</span>
          <h1>{target}</h1>
        </div>
        <div className={Styles.dataWrapper} style={{ marginBottom: 16 }}>
          <span>Actual</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1>{actual}</h1>
            {target > actual && <ChevronDownFill />}
            {target < actual && <ChevronUpFill />}
          </div>
        </div>
        <div className={Styles.dataWrapper}>
          <span>Differential</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1
              style={{
                color: colorDifferential(Number(target) <= Number(actual)),
              }}
            >
              {Math.abs(target - actual)}
            </h1>
          </div>
        </div>
        <div className={Styles.dataWrapper}>
          <span>Status</span>
          <h1
            className={Styles.status}
            style={{ backgroundColor: backgroundStatus(status) }}
          >
            {status}
          </h1>
        </div>
      </div>
    );
  };

  return <div className={classNames(styleContainer)}>{renderMain()}</div>;
};

ProductionPlanning.defaultProps = {
  machineName: "",
  target: 3000,
  actual: 2349,
  status: "running",
  styleContainer: {},
};

ProductionPlanning.propTypes = {
  machineName: PropTypes.string.isRequired,
  target: PropTypes.number,
  actual: PropTypes.number,
  status: PropTypes.string,
  styleContainer: PropTypes.object,
};
