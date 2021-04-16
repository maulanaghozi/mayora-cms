import React, {useRef, useEffect, useState} from 'react';
import style from './TextBoxEllipsis.module.scss';
import classNames from 'classnames';

export default function TextBoxEllipsis(props) {
    const [textIsOverflow, setTextIsOverflow] = useState(false);
    const boxRef = useRef(null);
    const checkIfTextOverflow = () => {
        if (boxRef.current) {
            return boxRef.current.scrollHeight > boxRef.current.offsetHeight;
        } else {
            return false;
        }
    }

    useEffect(() => {
        setTextIsOverflow(checkIfTextOverflow());
    }, [boxRef])

    return (
        <div
            className={classNames(style.container, {[props.className]: props.className})}
            style={{
                backgroundColor: props.backgroundColor,
                lineHeight: props.lineHeight + 'px',
                maxHeight: props.lineClamp * parseInt(props.lineHeight) + 'px'
            }}
            ref={boxRef}
        >
            {props.text}
            {
                textIsOverflow &&
                (
                    <div
                        className={style.truncation_char}
                        style={{
                            backgroundColor: props.backgroundColor,
                            lineHeight: props.lineHeight + 'px'
                        }}
                    >
                        {
                            props.customTruncationChar ?
                                <props.customTruncationChar /> :
                                '...'
                        }
                    </div>
                )
            }
        </div>
    )
}
