import React, { useState } from 'react';
import {
    container, input_text, title, flex_container,
    flex_child, label, type_box, input_radio,
    label_container, label_wrapper
} from './GroupForm.module.scss'

export default function GroupForm(props) {
    const [checked, setChecked] = useState('open');

    const handleChange = e => {
        if(e.target.type === 'radio') {
            setChecked(e.target.value);
        }

        props.setSearchCriteria({[e.target.name]: e.target.value});
    }

    return (
        <div className={container}>
            <div className={title}>GROUP DETAIL</div>
            <div className={flex_container}>
                <div className={flex_child}>
                    <div className={input_text}>
                        <span>Group Name :</span>
                        <input type={'text'} name={'group_name'} value={props.searchCriteria.group_name} onChange={handleChange} placeholder={'Contoh: Casting Iklan di Indonesia'} />
                    </div>
                    <div className={input_text}>
                        <span>Description :</span>
                        <textarea name={'description'} value={props.searchCriteria.description} onChange={handleChange} placeholder={'Dibutuhkan seorang...'} />
                    </div>
                </div>
                <div className={flex_child}>
                    <div className={input_radio}>
                        <span>Group Type :</span>
                        <div className={label_container}>
                            <div className={label_wrapper}>
                                <label className={label}>
                                    <input type={'radio'} checked={checked === 'open'} name={'group_type'} value={'open'} onChange={handleChange}/>
                                    <span className={type_box}>{'Open'}</span>
                                </label>
                            </div>
                            <div className={label_wrapper}>
                                <label className={label}>
                                    <input type={'radio'} checked={checked === 'private'} name={'group_type'} value={'private'} onChange={handleChange}/>
                                    <span className={type_box}>{'Private'}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
