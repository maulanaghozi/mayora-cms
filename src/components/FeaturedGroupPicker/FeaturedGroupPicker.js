import React, { useState, useEffect } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import GroupFilter from '../GroupFilter/GroupFilter';
import { http } from '../../utility/http';
import { debounce } from 'throttle-debounce';
import { useAlert } from 'react-alert';
import Pagination from '../Pagination/Pagination';
import FeaturedGroupListContainer from '../FeaturedGroupListContainer/FeaturedGroupListContainer';
import BoxButton from '../BoxButton/BoxButton';
import style from './FeaturedGroupPicker.module.scss';

export default function FeaturedGroupPicker(props) {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [groupData, setGroupData] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState({});

    const alert = useAlert();

    const searchCriteria = {
        page,
        rows,
        keyword,
    }

    const setter = {
        page: setPage,
        rows: setRows,
        keyword: setKeyword,
    }

    const setSearchCriteria = newCriteria => {
        for (let key in newCriteria) {
            if (searchCriteria.hasOwnProperty(key)) {
                setter[key](newCriteria[key]);
            }
        }
    }

    const getGroup = criteria => {
        const params = {
            method: 'GET',
            path: 'posting/group/search',
            query: {
                sortBy: 'created_at',
                order: 'DESC',
                status: 'active',
                type: 'open',
                exclude: props.featuredGroup.map(group => group.id)
            }
        }

        for (let key in criteria) {
            if (
                criteria[key] !== null &&
                criteria[key] !== undefined &&
                criteria[key] !== ''
            ) {
                params.query[key] = criteria[key];
            }
        }

        http(params)
        .then(result => {
            if (result && result.code === 'success') {
                setGroupData(result.payload);
            } else {
                alert.error('failed to fetch data');
            }
        })
    }

    const debouncedGetGroup = debounce(200, getGroup);

    useEffect(() => {
        debouncedGetGroup(searchCriteria);
    }, [
        page,
        rows,
        keyword,
    ])

    const selectedGroupToArray = obj => {
        let output = [];

        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key]) {
                output.push(obj[key]);
            }
        }

        return output;
    }

    return (
        <ModalContainer onClose={props.closeModal}>
            <div className={style.container}>
                <GroupFilter
                    searchCriteria={searchCriteria}
                    setSearchCriteria={setSearchCriteria}
                    type={'public'}
                />
                {groupData && <FeaturedGroupListContainer
                    data={groupData.rows}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                />}
                <Pagination
                    data={groupData}
                    searchCriteria={searchCriteria}
                    setSearchCriteria={setSearchCriteria}
                />
                <FeaturedGroupAdd
                    handleAdd={() => {props.handleAdd(selectedGroupToArray(selectedGroup))}}
                    groupCount={Object.keys(selectedGroup).length}
                />
            </div>
        </ModalContainer>
    )
}

const FeaturedGroupAdd = props => {
    return (
        <div className={style.add_container}>
            <div className={style.add_counter}>{props.groupCount + ' GROUP(S) SELECTED'}</div>
            <BoxButton
                className={style.add_button}
                text={'select group'}
                onClick={props.handleAdd}
            />
        </div>
    )
}