import React, { useContext } from 'react';
import classNames from 'classnames';
import {content_container, open} from './Content.module.scss';

export default function Content(props) {
    return (
        <div className={classNames(content_container, props.isOpen ? open : '')}>
            {/* <Header {...props} />
            <div className={child_container} style={{paddingTop: '60px'}}> */}
                {/* {props.children} */}
                {Array.isArray(props.children) ? props.children.map(child => (
                    React.cloneElement(child, {setPath: props.setPath, setTitle: props.setTitle})
                )) : React.cloneElement(props.children, {setPath: props.setPath, setTitle: props.setTitle})}
            {/* </div> */}
        </div>
    )
}
