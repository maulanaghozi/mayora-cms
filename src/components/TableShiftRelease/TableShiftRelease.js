import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "./TableShiftRelease.module.scss";

const Header = ["Time", "Release Amount"];
const headerClasses = [Styles.columnTime, Styles.columnAmount];

export default function TableShiftRelease(props) {
  const { title, styleContainer, data, total } = props;
  return (
    <div className={classNames(Styles.container, styleContainer)}>
      <span className={Styles.title}>{title}</span>
      <div className={classNames(Styles.tableContainer)}>
        <div className={Styles.tableHeader}>
          {Header.map((head, index) => (
            <NormalHeader
              key={index.toString()}
              index={index}
              columnName={head}
            />
          ))}
        </div>
        <div className={Styles.tableBody}>
          {data.map((row, index) => (
            <div className={Styles.tableRow} key={index}>
              <div className={Styles.columnTime}>
                <span>{row.time}</span>
              </div>
              <div className={Styles.columnAmount}>
                <span>
                  {row.amount ? row.amount : row.amount == 0 ? 0 : "-"}
                </span>
              </div>
            </div>
          ))}
          <div className={classNames(Styles.tableRow, Styles.footer)}>
            <div className={Styles.columnTime}>
              <span>Total</span>
            </div>
            <div className={Styles.columnAmount}>
              <span className={Styles.total}>{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TableShiftRelease.defaultProps = {
  styleContainer: {},
  title: "Shift 1",
  data: [
    { time: "07:00", amount: 100 },
    { time: "08:00", amount: 110 },
    { time: "09:00", amount: 120 },
    { time: "10:00", amount: 130 },
    { time: "11:00", amount: 140 },
    { time: "12:00", amount: 150 },
    { time: "13:00", amount: 160 },
    { time: "14:00", amount: 170 },
  ],
};

TableShiftRelease.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

const NormalHeader = props => {
  return (
    <div className={classNames(Styles.tableCell, headerClasses[props.index])}>
      <span>{props.columnName}</span>
    </div>
  );
};
