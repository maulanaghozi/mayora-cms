import React from 'react';
import ReportCard from '../ReportCard/ReportCard';
import style from './ReportCardList.module.scss';

export default function ReportCardList(props) {
    return (
        <div className={style.container}>
            {props.data.map(cardData => (
                <ReportCard
                    data={cardData}
                    type={'big'}
                    setSearchCriteria={props.setSearchCriteria}
                />
            ))}
        </div>
    )
}
