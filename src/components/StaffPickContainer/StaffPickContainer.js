import React from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import style from './StaffPickContainer.module.scss';
import StaffPickCard from '../StaffPickCard/StaffPickCard';

import {BluePlus} from '../../assets/image';

export default function StaffPickContainer(props) {
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = props.pickedTalent[dragIndex];
        props.setPickedTalent(
            update(props.pickedTalent, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
        )
    }

    return (
        <DndProvider backend={Backend}>
            <div className={style.container}>
                {
                    props.pickedTalent.map((talent, index) => {
                        return (
                            <StaffPickCard
                                key={talent.user_id}
                                index={index}
                                data={talent}
                                handleRemove={() => {props.handleRemove(index)}}
                                moveCard={moveCard}
                            />
                        )
                    })
                }
                <AddCard onClick={props.openModal} />
            </div>
        </DndProvider>
    )
}

const AddCard = props => {
    return (
        <div className={style.add_card_container} onClick={props.onClick}>
            <div className={style.add_card_label}>
                <div>
                    <BluePlus height={14} width={14} />
                </div>
                <div>
                    <p>{'Add'}</p>
                    <p>{'More'}</p>
                </div>
            </div>
        </div>
    )
}
