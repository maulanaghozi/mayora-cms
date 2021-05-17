import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "./CategoryList.module.scss";
import { PinnedIcon } from "../../assets/icons/index";
import { Context } from "../../hooks/context";

const ItemRadio = props => {
  const { item, isFirst } = props;
  return (
    <div
      className={classNames(Styles.itemContainer, {
        [Styles.topBorder]: !isFirst,
      })}
    >
      <PinnedIcon style={{ marginRight: 10 }} />
      <span>{item.name}</span>
    </div>
  );
};

export const CategoryList = props => {
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

CategoryList.defaultProps = {
  styleContainer: {},
  data: [],
};

CategoryList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
