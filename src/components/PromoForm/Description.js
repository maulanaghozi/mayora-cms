import React from 'react';
import { field_description, container_form_description } from './PromoForm.module.scss';

import Editor from '../HomeWysiwyg/HomeWysiwyg';

export default function Description({
    handleDescriptionChange,
    plainDescription,
    rawDescription
}) {
    return (
        <div className={container_form_description}>
            <div className={field_description}>
                <span>{'Description :'}</span>
            </div>
            <Editor
                placeholder={'input promo description here'}
                handleDescriptionChange={handleDescriptionChange}
                plainDescription={plainDescription}
                rawDescription={rawDescription}
            />
        </div>
    )
}