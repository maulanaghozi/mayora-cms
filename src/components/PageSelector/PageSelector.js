import React from 'react';

import { ReactComponent as NextGreyIcon } from '../../assets/next_grey.svg';
import { ReactComponent as PreviousGreyIcon } from '../../assets/previous_grey.svg';
import { ReactComponent as LastGreyIcon } from '../../assets/last_grey.svg';
import { ReactComponent as FirstGreyIcon } from '../../assets/first_grey.svg';
import { ReactComponent as NextBlueIcon } from '../../assets/next_blue.svg';
import { ReactComponent as PreviousBlueIcon } from '../../assets/previous_blue.svg';
import { ReactComponent as LastBlueIcon } from '../../assets/last_blue.svg';
import { ReactComponent as FirstBlueIcon } from '../../assets/first_blue.svg';

import {
    container, first_blue, previous_blue, next_blue, last_blue, first_grey,
    previous_grey, next_grey, last_grey
} from './PageSelector.module.scss';
import classNames from 'classnames';

export default function PageSelector(props) {
    const handleFirst = () => {
        props.setPage(1);
    }

    const handleLast = () => {
        if(props.result) {
            props.setPage(props.result.total_page);
        }
    }

    const handleNext = () => {
        if(props.result) {
            props.setPage(props.result.curr_page + 1);
        }
    }

    const handlePrevious = () => {
        if(props.result) {
            props.setPage(props.result.curr_page - 1);
        }
    }

    return (
        <div className={classNames(container, props.className)}>
            {
                (props.result && (props.result.curr_page > 1)) ?
                <React.Fragment>
                    <FirstBlueIcon onClick={handleFirst} className={first_blue} />
                    <PreviousBlueIcon onClick={handlePrevious} className={previous_blue} />
                </React.Fragment>
                :
                <React.Fragment>
                    <FirstGreyIcon className={first_grey} />
                    <PreviousGreyIcon className={previous_grey} />
                </React.Fragment>
            }
            { props.result ? props.result.curr_page + ' / ' + props.result.total_page : null }
            {
                (props.result && (props.result.curr_page < props.result.total_page)) ?
                <React.Fragment>
                    <NextBlueIcon onClick={handleNext} className={next_blue} />
                    <LastBlueIcon onClick={handleLast} className={last_blue} />
                </React.Fragment>
                :
                <React.Fragment>
                    <NextGreyIcon className={next_grey} />
                    <LastGreyIcon className={last_grey}/>
                </React.Fragment>
            }
        </div>
    )
}