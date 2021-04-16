import React from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import style from './FeaturedGroupContainer.module.scss';
import FeaturedGroupCard from '../FeaturedGroupCard/FeaturedGroupCard';

import {BluePlus} from '../../assets/image';

export default function FeaturedGroupContainer(props) {
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = props.featuredGroup[dragIndex];
        props.setFeaturedGroup(
            update(props.featuredGroup, {
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
                    props.featuredGroup.map((group, index) => {
                        return (
                            <FeaturedGroupCard
                                key={group.id}
                                index={index}
                                data={group}
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