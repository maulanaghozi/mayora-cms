import React from 'react';

import { primary, secondary } from './AuthHeader.module.scss'

export default function AuthHeader(props) {
    return (
        <React.Fragment>
            <div className={primary}>{props.primaryText}</div>
            {
                Array.isArray(props.secondaryText) ?
                props.secondaryText.map((text, i, arr) => {
                    if(i === arr.length - 1) {
                        return <div key={i} className={secondary} style={{margin: '2px auto 99px auto'}}>{text}</div>
                    }
                    return <div key={i} className={secondary} style={{margin: '2px auto 2px auto'}}>{text}</div>
                }):
                <div className={secondary}>{props.secondaryText}</div>
            }
        </React.Fragment>
    )
}
