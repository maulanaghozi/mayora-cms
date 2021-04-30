import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "./TroublelistRadio.module.scss";
import { Context } from "../../hooks/context";

const ItemRadio = props => {
  const { item, isSelected, setSelected, isFirst } = props;
  return (
    <div
      className={classNames(Styles.itemContainer, {
        [Styles.topBorder]: !isFirst,
      })}
      onClick={() =>
        setSelected({
          categoryId: item.id,
          categoryName: item.name,
        })
      }
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
  const globalState = useContext(Context);
  const { setCategory, category } = globalState;
  return (
    <div className={classNames(Styles.container, styleContainer)}>
      {data.map((item, idx) => (
        <ItemRadio
          key={idx.toString()}
          item={item}
          isSelected={category.categoryId === item.id}
          setSelected={setCategory}
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
