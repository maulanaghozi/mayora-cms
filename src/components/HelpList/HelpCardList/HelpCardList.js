import React from 'react';
import HelpCard from '../HelpCard/HelpCard';

export default function HelpCardList(props) {
    return (
        <div>
            {props.data.map(cardData => (
                <HelpCard data={cardData} />
            ))}
        </div>
    )
}
