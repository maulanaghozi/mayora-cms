import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "./TroublelistRadio.module.scss";

const ItemRadio = props => {
  const { item, isSelected, setSelected, isFirst } = props;
  return (
    <div
      className={classNames(Styles.itemContainer, {
        [Styles.topBorder]: !isFirst,
      })}
      onClick={() => setSelected(item.id)}
    >
      <div
        className={classNames(Styles.circle, { [Styles.selected]: isSelected })}
      >
        {isSelected && <div className={Styles.dotRed} />}
      </div>
      <span>{item.name}</span>
    </div>
  );
};

export const TroublelistRadio = props => {
  const [selectedId, setSelectedId] = useState(null);
  const { data, styleContainer } = props;
  return (
    <div className={classNames(Styles.container, styleContainer)}>
      {data.map((item, idx) => (
        <ItemRadio
          key={idx.toString()}
          item={item}
          isSelected={selectedId === item.id}
          setSelected={setSelectedId}
          isFirst={idx === 0}
        />
      ))}
    </div>
  );
};

TroublelistRadio.defaultProps = {
  styleContainer: {},
  data: [],
};

TroublelistRadio.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
