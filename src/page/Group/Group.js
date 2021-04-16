import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';

import Content from '../../components/Content/Content';
import PageTitle from '../../components/PageTitle/PageTitle';
import AddButton from '../../components/AddButton/AddButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import CountSelector from '../../components/CountSelector/CountSelector';
import PageCounter from '../../components/PageCounter/PageCounter';
import PageSelector from '../../components/PageSelector/PageSelector';
import GroupTable from '../../components/GroupTable/GroupTable';
import InputSelect from '../../components/InputSelect/InputSelect';

import { ReactComponent as SearchIcon } from '../../assets/search.svg'

import {
    group_container, header, filter, footer, selector_container,
    header_container, table_container
} from './Group.module.scss';
import { http } from '../../utility/http';
import useHeader from '../../hooks/useHeader/useHeader';

const searchbarStyle = {
    marginLeft: '2rem',
    marginRight: '1.5rem'
}

export default function Group() {
    const [searchCriteria, setSearchCriteria] = useState({
        page: 1,
        rows: 10,
        sortBy: "created_at",
        order: "DESC",
        key: 0
    });
    const [data, setData] = useState(null);

    const alert = useAlert();

    useHeader({
        title: ['Group'],
        path: ['/group']
    })

    useEffect(() => {
        getGroupData(searchCriteria);
    }, [searchCriteria]);

    const getGroupData = ({ page, rows, sortBy, order }) => {
        const params = {
            method: 'get',
            path: 'posting/group/search',
            query: {
                page: page,
                rows: rows,
                sortBy: sortBy,
                order: order,
            }
        }

        http(params)
            .then(res => {
                if (res && res.code === 'success') {
                    setData(res.payload);
                } else {
                    alert.error('fetch data failed!');
                }
            });
    }

    const handleSearchCriteriaChange = newCriteria => {
        setSearchCriteria({ ...searchCriteria, ...newCriteria })
    }

    return (
        <div className={group_container}>
            <div className={header_container}>
                <div className={header}>
                    <PageTitle
                        title={['group list']}
                        path={['/group']}
                        returnable={false}
                    />
                    <AddButton to={'/group/create'} text={'New Group'} />
                </div>
                <div className={filter}>
                    <SearchBar
                        style={searchbarStyle}
                        Icon={SearchIcon}
                        placeholder={'Group Name'}
                        name={'keyword'}
                        setValue={keyword => handleSearchCriteriaChange({ keyword: keyword })}
                    />
                    <InputSelect
                        defaultValue={{ value: '', label: 'All Status' }}
                        options={[
                            { value: '', label: 'All Status' },
                            { value: '1', label: 'Featured' },
                            { value: '0', label: 'Not Featured' }
                        ]}
                        onChange={selected => handleSearchCriteriaChange({ featured: selected.value })}
                        style={{ marginRight: '20px', width: '131px' }}
                    />
                    <InputSelect
                        defaultValue={{ value: '', label: 'All Type' }}
                        options={[
                            { value: '', label: 'All Type' },
                            { value: 'open', label: 'Open' },
                            { value: 'private', label: 'Private' }
                        ]}
                        onChange={selected => handleSearchCriteriaChange({ type: selected.value })}
                        style={{ width: '131px' }}
                    />
                </div>
            </div>
            <div className={table_container}>
                {data && Array.isArray(data.rows) &&
                    <GroupTable
                        data={data.rows}
                        sort={searchCriteria.sort}
                        setKey={() => {
                            setSearchCriteria({
                                ...searchCriteria,
                                key: searchCriteria.key + 1
                            })
                        }}
                        setSort={sort => {
                            setSearchCriteria({
                                ...searchCriteria,
                                sort: sort
                            })
                        }}
                    />
                }
                <div className={footer}>
                    <div className={selector_container}>
                        <CountSelector
                            setRow={row => {
                                setSearchCriteria({
                                    ...searchCriteria,
                                    row: row
                                })
                            }}
                        />
                        <PageCounter
                            searchCriteria={searchCriteria}
                            result={data}
                        />
                    </div>
                    <PageSelector
                        result={data}
                        setPage={page => {
                            setSearchCriteria({
                                ...searchCriteria,
                                page: page
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    );
}