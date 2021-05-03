import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import Styles from "./ProductionStatus.module.scss";

export const ProductionStatusBar = props => {
  const { machineName, data, minutesPass } = props;

  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds =
      Math.abs(new Date(dateFuture) - new Date(dateNow)) / 1000;
    if (!dateFuture) {
      const curentTime = moment().format("YYYY MM DD HH:mm");
      diffInMilliSeconds =
        Math.abs(new Date(curentTime) - new Date(dateNow)) / 1000;
    }

    // calculate minutes
    const minutes = diffInMilliSeconds / 60;

    return Math.round(Number(minutes));
  }

  const renderStatus = () => {
    return (
      <div className={Styles.statusContainer}>
        <div className={Styles.headerStatus}>
          <span>{`Production Status - ${machineName.toUpperCase()}`}</span>
          <div className={Styles.indicatorColor}>
            <div className={Styles.status}>
              <div className={classNames(Styles.box, Styles.grey)} />
              <span>Off</span>
            </div>
            <div className={Styles.status}>
              <div className={classNames(Styles.box, Styles.green)} />
              <span>Running</span>
            </div>
            <div className={Styles.status}>
              <div className={classNames(Styles.box, Styles.yellow)} />
              <span>Start Up</span>
            </div>
            <div className={Styles.status}>
              <div className={classNames(Styles.box, Styles.red)} />
              <span>Down Time</span>
            </div>
          </div>
        </div>
        {renderProgress()}
      </div>
    );
  };

  const backgroundProgress = status => {
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

  const renderProgress = () => {
    return (
      <div className={Styles.progressContainer}>
        <div className={classNames(Styles.bar)}>
          {data.map((item, idx) => (
            <div
              key={idx.toString()}
              style={{
                height: "20px",
                flex: timeDiffCalc(item.endTime, item.startTime),
                backgroundColor: backgroundProgress(item.status),
              }}
            ></div>
          ))}
          <div
            style={{
              height: "20px",
              flex: 1440 - minutesPass,
              backgroundColor: "#ffffff",
            }}
          ></div>
        </div>
        <div className={Styles.hours}>{renderHours()}</div>
      </div>
    );
  };

  const renderHours = () => {
    return (
      <>
        <span>07</span>
        <span>08</span>
        <span>09</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <span>13</span>
        <span>14</span>
        <span>15</span>
        <span>16</span>
        <span>17</span>
        <span>18</span>
        <span>19</span>
        <span>20</span>
        <span>21</span>
        <span>22</span>
        <span>23</span>
        <span>24</span>
        <span>01</span>
        <span>02</span>
        <span>03</span>
        <span>04</span>
        <span>05</span>
        <span>06</span>
      </>
    );
  };
  return <div>{renderStatus()}</div>;
};

ProductionStatusBar.defaultProps = {
  machineName: "",
  data: [],
  minutesPass: 0,
};

ProductionStatusBar.propTypes = {
  machineName: PropTypes.string.isRequired,
  data: PropTypes.array,
  minutesPass: PropTypes.number,
};
