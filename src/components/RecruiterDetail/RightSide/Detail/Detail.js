import React from 'react'
import { container, desc, require, description, flex, attribute, blueBold } from './Detail.module.scss'
import { phoneNumber } from '../../../../utility/utility'
import { ReactComponent as QuoteIcon } from '../../../../assets/user/quotation.svg'


const data = {
    description: "Hello, welcome to my profile! I’m a 25-year-old actress who enjoys acting. Experienced in acting for almost 10 years. Brave and bright, but can also be very stingy and a bit greedy. I’m average height with tan skin, brown hair and black eyes. Feel free to DM me! :)",
    recruiter_type: 'production house',
    website: 'www.paramountpictures.com',
    contact: '081823123522'
}

export default function DetailRecruiter(props) {
    return (
        <div className={container}>
            <div className={desc}>
                <QuoteIcon />
                <p className={description}>{data.description}</p>
            </div>
            <div className={require}>
                <div className={flex}>
                    <p className={attribute}>Tipe</p>
                    <p>: <span className={blueBold} style={{ textTransform: 'capitalize' }}>{data.recruiter_type}</span></p>
                </div>

                <div className={flex}>
                    <p className={attribute}>Website</p>
                    <p>: <span className={blueBold}>{data.website}</span></p>
                </div>

                <div className={flex}>
                    <p className={attribute}>Contact</p>
                    <p>: <span className={blueBold}>{phoneNumber(data.contact)}</span></p>
                </div>
            </div>
        </div>
    )
}