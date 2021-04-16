import React, { useState, useEffect, useRef } from 'react';
import style from './CastingForm.module.scss';
import {
    BlueDiamondTwo,
    BlueDiamondThree,
    CalendarIcon,
    RupiahIcon
} from '../../assets/image';
import SegmentTitle from './SegmentTitle';
import InputRange from '../InputRange/InputRange';
import InputToggle from '../InputToggle/InputToggle';
import InputSelect from '../InputSelect/InputSelect';
import InputText from '../InputText/InputText';
import classNames from 'classnames';
import FormLabel from './FormLabel';
import InputTextBox from '../InputTextBox/InputTextBox';
import InputCheckBox from '../InputCheckBox/InputCheckBox';
import InputDate from '../InputDate/InputDate';
import InputTag from '../InputTag/InputTag';
import numeral from 'numeral';
import InputMiniToggle from '../InputMiniToggle/InputMiniToggle';
import { getCastingType } from '../../utility/utility';

export default props => {
    return (
        <div className={style.job_detail_container}>
            <SegmentTitle
                title={'Job Detail'}
                Icon={BlueDiamondTwo}
            />

            {/* CASTING TYPE */}
            <FormLabel
                label={'Casting Type :'}
                className={style.form_label}
            >
                <InputToggle
                    className={style.toggle}
                    defaultValue={props.castingCriteria.type || 'kestingrum'}
                    options={[
                        {
                            label: 'Kestingrum',
                            value: 'kestingrum'
                        },
                        {
                            label: 'Casting Call',
                            value: 'casting_call'
                        }
                    ]}
                    onChange={value => {
                        props.setCastingCriteria({type: value})
                    }}
                />
            </FormLabel>

            {/* PRODUCTION TYPE */}
            <FormLabel
                label={'Production Type:'}
                className={style.form_label}
            >
                <InputSelect
                    className={classNames(style.input)}
                    defaultValue={
                        (
                            props.castingCriteria.production_type
                        ) ? 
                        {
                            label: props.castingCriteria.production_type,
                            value: props.castingCriteria.production_type
                        } :
                        {label: 'Select Production Type', value: null}
                    }
                    placeholder={'Select Production Type'}
                    options={props.masterData.productionType.map(
                        entry => ({label: entry, value: entry})
                    )}
                    onChange={selected => {
                        let production_type;

                        if (selected) {
                            production_type = selected.value;
                        }

                        props.setCastingCriteria({production_type})
                    }}
                    isMulti={false}
                />
            </FormLabel>

            {/* TITLE */}
            <FormLabel
                label={'Title :'}
                className={style.form_label}
            >
                <InputText
                    className={classNames(style.input, style.text)}
                    name={'title'}
                    placeholder={getCastingType('casting_call')}
                    value={props.castingCriteria.title}
                    setValue={title => {
                        props.setCastingCriteria({title});
                    }}
                />
            </FormLabel>
            {
                props.castingCriteria.type === 'kestingrum' &&
                <>
                    {/* JOB ROLE */}
                    <FormLabel
                        label={'Role :'}
                        className={style.form_label}
                    >
                        <InputSelect
                            className={classNames(style.input)}
                            defaultValue={
                                (
                                    props.castingCriteria.job_role
                                ) ? 
                                {
                                    label: props.castingCriteria.job_role,
                                    value: props.castingCriteria.job_role
                                } :
                                {label: 'Select Role', value: null}
                            }
                            placeholder={'Select Role'}
                            options={props.masterData.jobRole.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let job_role;

                                if (selected) {
                                    job_role = selected.value;
                                }

                                props.setCastingCriteria({job_role})
                            }}
                            isMulti={false}
                        />
                    </FormLabel>

                    {/* GENDER */}
                    <FormLabel
                        label={'Gender :'}
                        className={style.form_label}
                    >
                        {/* <InputSelect
                            className={classNames(style.input_gender)}
                            defaultValue={[]}
                            options={props.masterData.gender.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let gender = [];

                                if (Array.isArray(selected)) {
                                    gender = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({gender})
                            }}
                            placeholder={'Select Gender'}
                            isMulti={true}
                        /> */}
                        <InputSelect
                            className={classNames(style.input_gender)}
                            defaultValue={
                                (
                                    props.castingCriteria &&
                                    Array.isArray(props.castingCriteria.gender)
                                ) ? 
                                props.castingCriteria.gender.map(
                                    entry => ({label: entry, value: entry})
                                ) : []
                            }
                            placeholder={'Select Gender'}
                            options={props.masterData.gender.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let gender = [];

                                if (Array.isArray(selected)) {
                                    gender = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({gender})
                            }}
                            isMulti={true}
                        />
                    </FormLabel>

                    {/* AGE */}
                    <FormLabel
                        label={'Age :'}
                        className={style.form_label}
                    >
                        <InputRange
                            className={classNames(style.input, style.range)}
                            min={0}
                            max={120}
                            value={[
                                props.castingCriteria.min_age ? props.castingCriteria.min_age : 0,
                                props.castingCriteria.max_age ? props.castingCriteria.max_age : 120
                            ]}
                            onChange={value => {
                                props.setCastingCriteria({
                                    min_age: value[0],
                                    max_age: value[1]
                                })
                            }}
                            step={1}
                            typable={true}
                        />
                    </FormLabel>
                </>
            }

            {/* DESCRIPTION */}
            <FormLabel
                label={'Description :'}
                className={style.form_label}
            >
                <InputTextBox
                    className={classNames(style.input)}
                    name={'description'}
                    placeholder={'Persyratan casting...'}
                    onChange={e => {
                        props.setCastingCriteria({description: e.target.value});
                    }}
                    cols={100}
                    rows={5}
                    maxLength={500}
                    value={props.castingCriteria.description || ''}
                    resizable={false}
                />
            </FormLabel>

            {/* DUE DATE */}
            <FormLabel
                label={'Due Date :'}
                className={style.form_label}
            >
                <div className={classNames(style.input, style.div_container)}>
                    <InputCheckBox
                        className={classNames(style.checkbox)}
                        value={props.castingCriteria.due_date_open}
                        onChange={value => {
                            props.setCastingCriteria({
                                due_date_open: value
                            })
                        }}
                        label={'Open'}
                    />
                    <InputDate
                        className={style.input_date_due_date}
                        value={props.castingCriteria.due_date}
                        disabled={props.castingCriteria.due_date_open}
                        onChange={due_date => {
                            props.setCastingCriteria({due_date});
                        }}
                    />
                </div>
            </FormLabel>
            {
                props.castingCriteria.type === 'kestingrum' &&
                <>
                    {/* SHOOTING DATE */}
                    <FormLabel
                        label={'Shooting Date :'}
                        className={style.form_label}
                    >
                        <div className={classNames(style.input, style.shooting_date)}>
                            <div className={style.shooting_date_checkbox_container}>
                                <InputCheckBox
                                    className={classNames(style.checkbox)}
                                    value={props.castingCriteria.shooting_date_tbc}
                                    onChange={shooting_date_tbc => {
                                        props.setCastingCriteria({shooting_date_tbc});
                                    }}
                                    label={'TBC'}
                                />
                            </div>
                            <div>
                                <InputDate
                                    className={style.input_date_shooting_date}
                                    value={props.castingCriteria.shooting_date_start}
                                    disabled={props.castingCriteria.shooting_date_tbc}
                                    onChange={shooting_date_start => {
                                        props.setCastingCriteria({shooting_date_start});
                                    }}
                                />
                                <div className={classNames(
                                    style.input_date_shooting_date_separator,
                                    {[style.disabled]: props.castingCriteria.shooting_date_tbc}
                                )} />
                                <InputDate
                                    className={style.input_date_shooting_date}
                                    value={props.castingCriteria.shooting_date_end}
                                    disabled={props.castingCriteria.shooting_date_tbc}
                                    onChange={shooting_date_end => {
                                        props.setCastingCriteria({shooting_date_end});
                                    }}
                                />
                            </div>
                        </div>
                    </FormLabel>

                    {/* LOCATION */}
                    <FormLabel
                        label={'Shooting Location :'}
                        className={style.form_label}
                    >
                        <InputSelect
                            className={classNames(style.input)}
                            defaultValue={
                                (
                                    props.castingCriteria &&
                                    Array.isArray(props.castingCriteria.location)
                                ) ? 
                                props.castingCriteria.location.map(
                                    entry => ({label: entry, value: entry})
                                ) : []
                            }
                            placeholder={'Select Location'}
                            options={props.masterData.location.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let location = [];

                                if (Array.isArray(selected)) {
                                    location = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({location})
                            }}
                            isMulti={true}
                        />
                    </FormLabel>

                    <SegmentTitle
                        title={'other Requirement (optional)'}
                        Icon={BlueDiamondThree}
                    />

                    {/* WARDROBE DATE */}
                    <FormLabel
                        label={'Wardrobe Date :'}
                        className={style.form_label}
                    >
                        <div className={classNames(style.input, style.text_with_icon)}>
                            <CalendarIcon
                                width={14}
                                height={14}
                            />
                            <InputText
                                className={style.input_text_with_icon}
                                name={'wardrobe'}
                                placeholder={'DD/MM/YY'}
                                value={props.castingCriteria.wardrobe_date}
                                setValue={wardrobe_date => {
                                    props.setCastingCriteria({wardrobe_date});
                                }}
                            />
                        </div>
                    </FormLabel>

                    {/* WORKSHOP DATE */}
                    <FormLabel
                        label={'Workshop Date :'}
                        className={style.form_label}
                    >
                        <div className={classNames(style.input, style.text_with_icon)}>
                            <CalendarIcon
                                width={14}
                                height={14}
                            />
                            <InputText
                                className={style.input_text_with_icon}
                                name={'workshop'}
                                placeholder={'DD/MM/YY'}
                                value={props.castingCriteria.workshop_date}
                                setValue={workshop_date => {
                                    props.setCastingCriteria({workshop_date});
                                }}
                            />
                        </div>
                    </FormLabel>

                    {/* FEE */}
                    <FormLabel
                        label={'Fee :'}
                        className={style.form_label}
                    >
                        <div className={classNames(style.input, style.text_with_icon)}>
                            <RupiahIcon
                                width={14}
                                height={14}
                            />
                            <InputText
                                className={style.input_text_with_icon}
                                name={'fee'}
                                placeholder={'1.000.000'}
                                value={numeral(props.castingCriteria.fee).format('0,0')}
                                setValue={newValue => {
                                    const fee = numeral(newValue).value();
                                    props.setCastingCriteria({fee});
                                }}
                                currency={true}
                            />
                        </div>
                    </FormLabel>

                    {/* MEDIA */}
                    <FormLabel
                        label={'Media :'}
                        className={style.form_label}
                    >
                        <InputText
                            className={classNames(style.input, style.text)}
                            name={'media'}
                            placeholder={'Contoh: Billboard, TVC, Digital, Cinema, Print'}
                            value={props.castingCriteria.media}
                            setValue={media => {
                                props.setCastingCriteria({media});
                            }}
                        />
                    </FormLabel>

                    {/* Height */}
                    <FormLabel
                        label={'Tinggi (cm) :'}
                        className={style.form_label}
                    >
                        <InputRange
                            className={classNames(style.input, style.range)}
                            min={40}
                            max={230}
                            value={[
                                props.castingCriteria.min_height ? props.castingCriteria.min_height : 40,
                                props.castingCriteria.max_height ? props.castingCriteria.max_height : 230
                            ]}
                            onChange={value => {
                                props.setCastingCriteria({
                                    min_height: value[0],
                                    max_height: value[1]
                                })
                            }}
                            step={1}
                            typable={true}
                        />
                    </FormLabel>

                    {/* Weight */}
                    <FormLabel
                        label={'Berat (kg) :'}
                        className={style.form_label}
                    >
                        <InputRange
                            className={classNames(style.input, style.range)}
                            min={0}
                            max={300}
                            value={[
                                props.castingCriteria.min_weight ? props.castingCriteria.min_weight : 0,
                                props.castingCriteria.max_weight ? props.castingCriteria.max_weight : 300
                            ]}
                            onChange={value => {
                                props.setCastingCriteria({
                                    min_weight: value[0],
                                    max_weight: value[1]
                                })
                            }}
                            step={1}
                            typable={true}
                        />
                    </FormLabel>

                    {/* SKIN COLOR */}
                    <FormLabel
                        label={'Skin Color:'}
                        className={style.form_label}
                    >
                        <InputSelect
                            className={classNames(style.input)}
                            defaultValue={
                                (
                                    props.castingCriteria &&
                                    Array.isArray(props.castingCriteria.skin_color)
                                ) ? 
                                props.castingCriteria.skin_color.map(
                                    entry => ({label: entry, value: entry})
                                ) : []
                            }
                            placeholder={'Select Skin Color'}
                            options={props.masterData.skinColor.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let skin_color = [];

                                if (Array.isArray(selected)) {
                                    skin_color = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({skin_color})
                            }}
                            isMulti={true}
                        />
                    </FormLabel>

                    {/* HAIR TYPE */}
                    <FormLabel
                        label={'Hair :'}
                        className={style.form_label}
                    >
                        <InputSelect
                            className={classNames(style.input)}
                            defaultValue={
                                (
                                    props.castingCriteria &&
                                    Array.isArray(props.castingCriteria.hair_type)
                                ) ? 
                                props.castingCriteria.hair_type.map(
                                    entry => ({label: entry, value: entry})
                                ) : []
                            }
                            placeholder={'Select Hair'}
                            options={props.masterData.hairType.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let hair_type = [];

                                if (Array.isArray(selected)) {
                                    hair_type = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({hair_type})
                            }}
                            isMulti={true}
                        />
                    </FormLabel>

                    {/* BODY TYPE */}
                    <FormLabel
                        label={'Body Type :'}
                        className={style.form_label}
                    >
                        <InputSelect
                            className={classNames(style.input)}
                            defaultValue={
                                (
                                    props.castingCriteria &&
                                    Array.isArray(props.castingCriteria.body_type)
                                ) ? 
                                props.castingCriteria.body_type.map(
                                    entry => ({label: entry, value: entry})
                                ) : []
                            }
                            placeholder={'Select Body Type'}
                            options={props.masterData.bodyType.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let body_type = [];

                                if (Array.isArray(selected)) {
                                    body_type = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({body_type})
                            }}
                            isMulti={true}
                        />
                    </FormLabel>

                    {/* ETHNICITY */}
                    <FormLabel
                        label={'Ethnicity :'}
                        className={style.form_label}
                    >
                        <InputSelect
                            className={classNames(style.input)}
                            defaultValue={
                                (
                                    props.castingCriteria &&
                                    Array.isArray(props.castingCriteria.ethnicity)
                                ) ? 
                                props.castingCriteria.ethnicity.map(
                                    entry => ({label: entry, value: entry})
                                ) : []
                            }
                            placeholder={'Select Ethnicity'}
                            options={props.masterData.ethnicity.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let ethnicity = [];

                                if (Array.isArray(selected)) {
                                    ethnicity = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({ethnicity})
                            }}
                            isMulti={true}
                        />
                    </FormLabel>

                    {/* AGENCY */}
                    <FormLabel
                        label={'Agency :'}
                        className={style.form_label}
                    >
                        <div className={style.input_mini_toggle_container}>
                            <InputMiniToggle
                                value={props.castingCriteria.agency}
                                onChange={agency => {
                                    props.setCastingCriteria({agency});
                                }}
                            />
                            <span>{props.castingCriteria.agency === 1 ? 'Yes' : 'No'}</span>
                        </div>
                    </FormLabel>

                    {/* EXPERIENCE */}
                    <FormLabel
                        label={'Experience :'}
                        className={style.form_label}
                    >
                        <InputSelect
                            className={classNames(style.input)}
                            defaultValue={
                                (
                                    props.castingCriteria &&
                                    Array.isArray(props.castingCriteria.experience)
                                ) ? 
                                props.castingCriteria.experience.map(
                                    entry => ({label: entry, value: entry})
                                ) : []
                            }
                            placeholder={'Select Experience'}
                            options={props.masterData.experience.map(
                                entry => ({label: entry, value: entry})
                            )}
                            onChange={selected => {
                                let experience = [];

                                if (Array.isArray(selected)) {
                                    experience = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({experience})
                            }}
                            isMulti={true}
                        />
                    </FormLabel>

                    {/* SKILL */}
                    <FormLabel
                        label={'Skill :'}
                        className={style.form_label}
                    >
                        <InputTag
                            className={classNames(style.input)}
                            defaultValue={
                                (
                                    props.castingCriteria &&
                                    Array.isArray(props.castingCriteria.skill)
                                ) ? 
                                props.castingCriteria.skill.map(
                                    entry => ({label: entry, value: entry})
                                ) : []
                            }
                            placeholder={'Contoh: Nyanyi, Memanjat'}
                            menuMessage={'Type a skill, and press enter to add it'}
                            onChange={selected => {
                                let skill = [];

                                if (Array.isArray(selected)) {
                                    skill = selected.map(entry => entry.value);
                                }

                                props.setCastingCriteria({skill})
                            }}
                        />
                    </FormLabel>
                </>
            }
        </div>
    )
}