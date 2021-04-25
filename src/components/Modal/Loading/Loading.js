import React from 'react';
import style from './Loading.module.scss';

export default (props) => {
    return (
        <div className={style.showbox}>
            <div className={style.loader}>
                <svg className={style.circular} viewBox='25 25 50 50'>
                    <circle
                        className={style.path}
                        cx='50'
                        cy='50'
                        r={(props.radius || '20') + ''}
                        fill='none'
                        strokeWidth='4'
                        strokeMiterlimit='10'
                    />
                </svg>
            </div>
        </div>
    )
}
