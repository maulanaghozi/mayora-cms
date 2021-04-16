import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { container, input } from './SearchBar.module.scss';

let timeout;

/**
 * Searchbar Component
 */
export default function SearchBar(props) {
    const [value, setValue] = useState('');

    useEffect(() => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            props.setValue(value)
        }, 150);
    }, [value])

    const handleChange = e => {
        if (e.target.name === props.name) {
            setValue(e.target.value);
        }
    }
    return (
        <div className={classNames(container, props.className)} style={props.style}>
            <props.Icon width={14} height={14} />
            <form>
                <input
                    placeholder={props.placeholder}
                    className={input}
                    name={props.name}
                    type={'text'}
                    value={value}
                    onChange={handleChange} />
            </form>
        </div>
    )
}

SearchBar.propTypes = {
    /**Input name */
    name: PropTypes.string.isRequired,

    /**Searchbar container classname */
    className: PropTypes.string,

    /**Searchbar container style */
    style: PropTypes.object,

    /**Searchbar placeholder */
    placeholder: PropTypes.string.isRequired,

    /**Searchbar icon */
    Icon: PropTypes.elementType.isRequired,

    /**Parent state setter */
    setValue: PropTypes.func.isRequired
}