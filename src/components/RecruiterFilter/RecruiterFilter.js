// Packages
import React from "react";

// Components
import InputSelect from "../../components/InputSelect/InputSelect";
import SearchBar from "../../components/SearchBar/SearchBar";

// Utility
import { arrayToOptions } from "../../utility/utility";

// Assets
import { SearchIcon } from "../../assets/image";

// Hooks
import useMasterData from "../../hooks/useMasterData/useMasterData";

// Style
import style from "./RecruiterFilter.module.scss";

const Filter = props => {
  const masterSelect = (name, key, options = [], isArray = false) => {
    return (
      <InputSelect
        className={style.select}
        defaultValue={arrayToOptions(props.searchCriteria[key] || [])}
        placeholder={name}
        options={[...arrayToOptions(options)]}
        onChange={selected => {
          props.setSearchCriteria({
            [key] : selected.map(entry => entry.value)
          })
        }}
        isMulti={isArray}
        isFilter={true}
      />
    );
  };

  return (
    <div className={style.container}>
      <div className={style.filter}>
        <SearchBar
          className={style.searchbar}
          Icon={SearchIcon}
          placeholder={"Name / Username"}
          name={"keyword"}
          setValue={(keyword) => props.setSearchCriteria({ keyword })}
        />
        {masterSelect("Tipe Role", "recruiter_type", props.master.recruiterType, true)}
        {masterSelect("Lokasi", "location", props.master.location, true)}
      </div>
    </div>
  )
};

export default function FilterTalent(props) {
  const masterData = useMasterData();

  return (
    <React.Fragment>
      {masterData && 
        <Filter
          {...props}
          master={masterData}
        />
      }
    </React.Fragment>
  )
}
