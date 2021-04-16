import React from 'react';
import style from './CastingForm.module.scss';
import {
    ImageIcon
} from '../../assets/image';

export default () => {
    return (
        <div className={style.hover_layer}>
            <div className={style.hover_label}>
                <div className={style.icon}>
                    <ImageIcon />
                </div>
                <div className={style.text}>Ganti</div>
                <div className={style.text}>Video / Foto</div>
            </div>
        </div>
    )
}