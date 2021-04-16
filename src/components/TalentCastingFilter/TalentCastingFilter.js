// Packages
import React from "react";

// Components
import SearchBar from "../SearchBar/SearchBar";
import InputSelect from "../InputSelect/InputSelect";

// Style
import style from "./TalentCastingFilter.module.scss";

// Utility
import { arrayToOptions } from "../../utility/utility";

// Hooks
import useMasterData from "../../hooks/useMasterData/useMasterData";

// Assets
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

const Filter = props => {
  return (
    <div className={style.filter}>
      <SearchBar
        Icon={SearchIcon}
        name={'keyword'}
        placeholder={'Casting Title'}
        setValue={keyword => props.handleSearchCriteriaChange({ keyword: keyword })}
      />
      <InputSelect
        className={style.select}
        defaultValue={arrayToOptions(props.searchCriteria["application_status"] || [])}
        placeholder={"Application Status"}
        options={[...arrayToOptions([
          "pending",
          "rejected",
          "shortlist",
          "cast"
        ])]}
        onChange={ selected => {
            props.handleSearchCriteriaChange(
                {
                  application_status: selected.map(entry => entry.value)
                }
            )
        }}
        isMulti={true}
      />
    </div>
  )
}

export default function TalentCastingFilter(props) {
  const masterData = useMasterData();

  return (
    <React.Fragment>
      {masterData && <Filter {...props} master={masterData}/>}
    </React.Fragment>
  )
}