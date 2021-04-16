import React from 'react';
import style, { table_cell, column_talent } from '../PortfolioTable.module.scss';
import classNames from 'classnames';
import { getProfilePic } from '../../../utility/utility';

export default function Tag(props) {
  return (
    <div className={classNames(table_cell, column_talent)}>
        {props.row.user && <React.Fragment>
          <div 
            className={style.profile_pic}
            style={{backgroundImage:`url(${getProfilePic(props.row.user.profile_pic_url)})`}}
          ></div>
          <span>{props.row.user.name}</span>
        </React.Fragment>}
    </div>
  )
}