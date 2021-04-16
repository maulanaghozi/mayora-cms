import React from 'react';
import classNames from 'classnames';
import {GreenCircleWhiteCheck} from '../../assets/image';
import { capitalize } from '../../utility/utility';
import style from './CheckWithTooltip.module.scss';

const atLeastHasOneTrue = array => {
    let passed = false;

    for (let i = 0; i < array.length; i++) {
        if (array[i]) {
            passed = true;
            break;
        }
    }

    return passed;
}

export default function CheckWithTooltip(props) {
    const renderName = comparison => {
        let output = '';

        comparison.forEach((value, index) => {
            if (value) {
                if (output === '') {
                    output += capitalize(props.name[index]);
                } else {
                    output += (', ' + props.name[index]);
                }
            }
        });

        return output;
    }

    const renderCheck = comparison => {
        if (typeof comparison === 'boolean' && comparison) {
            return (
                <CheckContainer className={props.className}>
                    <span>{capitalize(props.name) + ' sesuai kriteria'}</span>
                </CheckContainer>
            );
        } else if (Array.isArray(comparison) && atLeastHasOneTrue(comparison)) {
            return (
                <CheckContainer className={props.className}>
                    <span>{renderName(comparison) + ' sesuai kriteria'}</span>
                </CheckContainer>
            )
        }
    }

    return (
        <>
            {renderCheck(props.comparison(props.value, props.comparator))}
        </>
    )
}

const CheckContainer = props => {
    return (
        <div className={classNames(style.container, props.className)}>
            <GreenCircleWhiteCheck width={15} height={15} />
            <div className={style.tooltip}>
                <div className={style.dialog_box}>
                    {props.children}
                </div>
                <div className={style.triangle}></div>
            </div>
        </div>
    )
}