import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Styles from "./CategoryList.module.scss";
import { PinnedIcon } from "../../assets/icons/index";
import { Context } from "../../hooks/context";

const ItemRadio = props => {
  const { item, isFirst, setEditModalIsOpened, setCategoryEdit } = props;

  const handleOnCLick = () => {
    console.log(item);
    setCategoryEdit(item);
    setEditModalIsOpened(true);
  };

  return (
    <div
      className={classNames(Styles.itemContainer, {
        [Styles.topBorder]: !isFirst,
      })}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <PinnedIcon style={{ marginRight: 10 }} />
        <span>{item.name}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span onClick={() => handleOnCLick()} className={Styles.action}>
          Edit
        </span>
        <span className={Styles.action}>Delete</span>
      </div>
    </div>
  );
};

export const CategoryList = props => {
  const { data, styleContainer, setEditModalIsOpened, setCategoryEdit } = props;
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
          setEditModalIsOpened={setEditModalIsOpened}
          setCategoryEdit={setCategoryEdit}
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
