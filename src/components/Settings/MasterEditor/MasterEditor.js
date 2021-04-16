import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';

import useHeader from '../../../hooks/useHeader/useHeader';

import MasterForm from '../MasterForm/MasterForm';
import MasterTable from '../MasterTable/MasterTable';

import { editor_container } from './MasterEditor.module.scss'
import { http } from '../../../utility/http';

export default function MasterEditor(props) {
    const [masterData, setMasterData] = useState([]);
    const [isAscending, setIsAscending] = useState(true);

    const alert = useAlert();

    useEffect(() => {
        fetchMasterData();
    }, [isAscending])

    const fetchMasterData = () => {
        http({
            method: 'GET',
            path: props.apiUrl + '/list',
            query: {
                sort: isAscending ? 'ASC' : 'DESC'
            }
        })
        .then(result => {
            if(result && result.code === 'success') {
                const modifiedResult = result.payload.map(data => {
                    const output = {
                        id: data.id,
                        type: data[props.attribute]
                    }

                    if (props.attribute === 'skin_color') {
                        output.color = data.hex_color
                    }

                    return output;
                })
                setMasterData(modifiedResult);
            } else {
                alert.error('fetch data failed!');
            }
        })
        .catch(err => {
            alert.error('fetch data failed');
            console.error(err);
        })
    }

    return (
        <div className={editor_container}>
            <MasterForm
                type={props.name}
                attribute={props.attribute}
                apiUrl={props.apiUrl}
                fetchMasterData={fetchMasterData}
            />
            <MasterTable
                type={props.name}
                attribute={props.attribute}
                apiUrl={props.apiUrl}
                masterData={masterData}
                fetchMasterData={fetchMasterData}
                isAscending={isAscending}
                setIsAscending={setIsAscending}
            />
        </div>
    )
}
