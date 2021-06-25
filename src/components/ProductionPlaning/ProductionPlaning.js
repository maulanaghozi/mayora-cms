import React from "react";
import PropTypes from "prop-types";
import Styles from "./ProductionPlaning.module.scss";
import { ChevronDownFill, ChevronUpFill } from "../../assets/icons";
import { currencyFormater } from "../../utility/utility";

export const ProductionPlanning = props => {
  const { machineName, target, actual, status } = props;

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
        <div className={Styles.dataWrapper}>
          <span>Type</span>
          <h1 className={Styles.type}>{machineName}</h1>
        </div>
        <div className={Styles.dataWrapper}>
          <span>Target</span>
          <h1>{currencyFormater(target)}</h1>
        </div>
        <div className={Styles.dataWrapper}>
          <span>Actual</span>
          <div>
            <h1 style={{ marginRight: 10 }}>{currencyFormater(actual)}</h1>
            {target > actual && <ChevronDownFill />}
            {target < actual && <ChevronUpFill />}
          </div>
        </div>
        <div className={Styles.dataWrapper}>
          <span>Differential</span>
          <h1
            style={{
              color: colorDifferential(Number(target) <= Number(actual)),
            }}
          >
            {currencyFormater(Math.abs(target - actual))}
          </h1>
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

  return (
    <div className={Styles.container}>
      <div className={Styles.headerStatus}>
        <span>Production Planning</span>
      </div>
      {renderDisplay()}
    </div>
  );
};

ProductionPlanning.defaultProps = {
  machineName: "",
  target: 3000,
  actual: 2349,
  status: "disconnected",
};

ProductionPlanning.propTypes = {
  machineName: PropTypes.string.isRequired,
  target: PropTypes.number,
  actual: PropTypes.number,
  status: PropTypes.string,
};
