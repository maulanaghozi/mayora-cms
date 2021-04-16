import React, { useState, useEffect, useRef } from 'react';
import style from './CastingForm.module.scss';
import UploadBriefForm from './UploadBriefForm';
import CastingDetailForm from './CastingDetailForm';

export default props => {
    return (
        <div className={style.container}>
            <UploadBriefForm
                castingCriteria={props.castingCriteria}
                setCastingCriteria={props.setCastingCriteria}
            />
            <CastingDetailForm
                castingCriteria={props.castingCriteria}
                setCastingCriteria={props.setCastingCriteria}
                masterData={props.masterData}
            />
        </div>
    )
}