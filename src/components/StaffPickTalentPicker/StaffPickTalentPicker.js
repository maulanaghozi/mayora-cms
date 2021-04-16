import React, { useState, useEffect } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import TalentFilter from '../TalentFilter/TalentFilter';
import { http } from '../../utility/http';
import { debounce } from 'throttle-debounce';
import { useAlert } from 'react-alert';
import Pagination from '../Pagination/Pagination';
import StaffPickTalentContainer from '../StaffPickTalentContainer/StaffPickTalentContainer';
import BoxButton from '../BoxButton/BoxButton';
import style from './StaffPickTalentPicker.module.scss';

export default function StaffPickTalentPicker(props) {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState([]);
    const [location, setLocation] = useState([]);
    const [gender, setGender] = useState([]);
    const [min_age, setMinAge] = useState(0);
    const [max_age, setMaxAge] = useState(120);
    const [experience, setExperience] = useState([]);
    const [min_height, setMinHeight] = useState(40);
    const [max_height, setMaxHeight] = useState(230);
    const [min_weight, setMinWeight] = useState(0);
    const [max_weight, setMaxWeight] = useState(300);
    const [ethnicity, setEthnicity] = useState([]);
    const [skin_color, setSkinColor] = useState([]);
    const [hair_type, setHairType] = useState([]);
    const [body_type, setBodyType] = useState([]);
    const [agency, setAgency] = useState([]);
    const [talentData, setTalentData] = useState(null);
    const [selectedTalent, setSelectedTalent] = useState({});

    const alert = useAlert();

    const searchCriteria = {
        page,
        rows,
        keyword,
        status,
        location,
        gender,
        min_age,
        max_age,
        experience,
        min_height,
        max_height,
        min_weight,
        max_weight,
        ethnicity,
        skin_color,
        hair_type,
        body_type,
        agency,
    }

    const setter = {
        page: setPage,
        rows: setRows,
        keyword: setKeyword,
        status: setStatus,
        location: setLocation,
        gender: setGender,
        min_age: setMinAge,
        max_age: setMaxAge,
        experience: setExperience,
        min_height: setMinHeight,
        max_height: setMaxHeight,
        min_weight: setMinWeight,
        max_weight: setMaxWeight,
        ethnicity: setEthnicity,
        skin_color: setSkinColor,
        hair_type: setHairType,
        body_type: setBodyType,
        agency: setAgency,
    }

    const setSearchCriteria = newCriteria => {
        for (let key in newCriteria) {
            if (searchCriteria.hasOwnProperty(key)) {
                setter[key](newCriteria[key]);
            }
        }
    }

    const getTalent = criteria => {
        const params = {
            method: 'GET',
            path: 'profiles/talent/search',
            query: {
                sortBy: 'updated_at',
                order: 'DESC',
                exclude: props.pickedTalent.map(talent => talent.user_id)
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

        if (params.query.min_age === 0 && params.query.max_age === 120) {
            delete params.query.min_age;
            delete params.query.max_age;
        }

        if (params.query.min_height === 40 && params.query.max_height === 230) {
            delete params.query.min_height;
            delete params.query.max_height;
        }

        if (params.query.min_weight === 0 && params.query.max_weight === 300) {
            delete params.query.min_weight;
            delete params.query.max_weight;
        }

        http(params)
        .then(result => {
            if (result && result.code === 'success') {
                setTalentData(result.payload);
            } else {
                alert.error('failed to fetch talent');
            }
        })
    }

    const debouncedGetTalent = debounce(200, getTalent);

    useEffect(() => {
        debouncedGetTalent(searchCriteria);
    }, [
        page,
        rows,
        keyword,
        status,
        location,
        gender,
        min_age,
        max_age,
        experience,
        min_height,
        max_height,
        min_weight,
        max_weight,
        ethnicity,
        skin_color,
        hair_type,
        body_type,
        agency,
    ])

    const selectedTalentToArray = obj => {
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
                <TalentFilter
                    searchCriteria={searchCriteria}
                    setSearchCriteria={setSearchCriteria}
                />
                {talentData && <StaffPickTalentContainer
                    data={talentData.rows}
                    selectedTalent={selectedTalent}
                    setSelectedTalent={setSelectedTalent}
                />}
                <Pagination
                    data={talentData}
                    searchCriteria={searchCriteria}
                    setSearchCriteria={setSearchCriteria}
                />
                <StaffPickAdd
                    handleAdd={() => {props.handleAdd(selectedTalentToArray(selectedTalent))}}
                    talentCount={Object.keys(selectedTalent).length}
                />
            </div>
        </ModalContainer>
    )
}

const StaffPickAdd = props => {
    return (
        <div className={style.add_container}>
            <div className={style.add_counter}>{props.talentCount + ' TALENT SELECTED'}</div>
            <BoxButton
                className={style.add_button}
                text={'pick talent'}
                onClick={props.handleAdd}
            />
        </div>
    )
}