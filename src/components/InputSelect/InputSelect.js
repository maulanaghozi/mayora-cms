import React from 'react';
import Select, {components} from 'react-select';
import style from './InputSelect.module.scss';


/**
 * InputSelect Component
 */
export default function InputSelect(props) {
    let reverseMenuStyle = {}
    let reverseIndicatorStyle = {}
    let indicatorContainerWidth = 32;

    const hasValue = () => {
        return (
            props.isMulti &&
            Array.isArray(props.defaultValue) &&
            props.defaultValue.length > 0
        )
    }

    if (props.isLoading) {
        indicatorContainerWidth += 40
    }

    if (hasValue()) {
        indicatorContainerWidth += 36
    }

    if (props.reverse) {
        reverseMenuStyle = {
            position: 'absolute !important',
            top: 'auto !important',
            bottom: 'calc(100% - 1px) !important',
            borderBottomLeftRadius: '0px !important',
            borderBottomRightRadius: '0px !important',
            borderTopLeftRadius: '5px !important',
            borderTopRightRadius: '5px !important'
        }

        reverseIndicatorStyle = {
            transform: 'rotate(180deg)'
        }
    }

    const icon = image => ({
        alignItems: 'center',
        display: 'flex',
      
        ':before': {
            backgroundImage: 'url(' + image + ')',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            content: '" "',
            display: 'block',
            marginRight: 15,
            height: 14,
            width: 14,
        },
      });

    const customStyle = {
        container: (provided, state) => ({
            ...provided,
            ...props.style,
            userSelect: 'none'
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: '#ffffff'
        }),
        control: (provided, state) => ({
            ...provided,
            borderRadius: 0,
            border: hasValue() ? '3px solid #00aeef !important' : '2px solid #e9eff4',
            boxShadow: 'none',
            height: '3rem',
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.8rem',
            fontWeight: '500',
            color: '#000000',
            paddingLeft: '5px',
            '&:hover': {
                borderColor: '#00aeef'
            }
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            width: indicatorContainerWidth + 'px',
            justifyContent: 'center',
            display: hasValue() ? 'none' : 'flex'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            padding: '0px',
            paddingRight: '2px',
            color: '#000000',
            '&:hover': {
                color: '#000000'
            },
            ...reverseIndicatorStyle
        }),
        menuList: (provided, state) => ({
            ...provided,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.8rem',
            fontWeight: '500',
            color: '#000000',
        }),
        menu: (provided, state) => ({
            ...provided,
            borderRadius: 0,
            ...reverseMenuStyle
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#00aeef' : '#ffffff'
        })
    }

    if (props.icon) {
        customStyle.input = provided => ({...provided, ...icon(props.icon)})
        customStyle.placeholder = provided => ({...provided, ...icon(props.icon)})
        customStyle.singleValue = provided => ({...provided, ...icon(props.icon)})
    }

    const SingleValue = ({ children, ...selectProps }) => {
        return (
                <div className={style.value_container}>
                    <div className={style.value}>
                        {'Pilih Action'}
                    </div>
                    {
                        props.selected &&
                        <div className={style.count}>
                            <span>
                                {props.selected}
                            </span>
                        </div>
                    }
                </div>
        )
    }

    const isMultiProps = () => {
        if (props.isMulti) {
            return {
                components: {MultiValue},
                closeMenuOnSelect: false,
            }
        }
    }

    const selectedProps = () => {
        if (props.selected) {
            return {
                components: {SingleValue}
            }
        }
    }

    return (
        <Select
            className={props.className}
            defaultValue={props.defaultValue}
            options={props.options}
            isSearchable={false}
            styles={customStyle}
            onChange={props.onChange}
            isLoading={props.isLoading}
            isMulti={props.isMulti}
            isDisabled={props.isDisabled}
            placeholder={props.placeholder}
            {...(isMultiProps())}
            {...(selectedProps())}
            hideSelectedOptions={false}
        />
    )
}

const MultiValue = ({ children, ...props }) => {
    const selected = props.getValue();
    if (
        selected[0].value === props.data.value &&
        selected[0].label === props.data.label
    ) {
        return (
            <div className={style.value_container}>
                <div className={style.value}>
                    {selected.map(entry => entry.label).join(', ')}
                </div>
                <div className={style.count}>
                    <span>
                        {selected.length}
                    </span>
                </div>
            </div>
        )
    } else {
        return null;
    }
};