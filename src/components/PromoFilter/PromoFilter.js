import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

import SearchBar from "../SearchBar/SearchBar";
import InputSelect from "../InputSelect/InputSelect";
import InputDateRange from "../InputDateRange/InputDateRange";
import AddButton from "../AddButton/AddButton";

import style from "./PromoFilter.module.scss";
import { arrayToOptions } from "../../utility/utility";

export default function PromoFilter(props) {
  const { searchCriteria, handleSearchCriteriaChange } = props;

  const [publishedDateStart, setPublishedDateStart] = useState(
    searchCriteria.publishedDateStart
  );

  const [publishedDateEnd, setPublishedDateEnd] = useState(
    searchCriteria.publishedDateEnd
  );

  useEffect(() => {
    handleSearchCriteriaChange({
      publishedDateStart,
      publishedDateEnd,
    });
  }, [publishedDateStart, publishedDateEnd]);

  return (
    <div className={style.container}>
      <div className={style.filter}>
        <SearchBar
          style={{
            marginLeft: "0",
          }}
          className={style.search}
          name={"keyword"}
          setValue={(keyword) => handleSearchCriteriaChange({ keyword })}
          placeholder={"Title"}
          Icon={SearchIcon}
        />
        <InputSelect
          className={style.select}
          placeholder={"Status"}
          defaultValue={arrayToOptions(searchCriteria.status) || []}
          options={[
            { value: "draft", label: "Draft" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          onChange={(selected) =>
            handleSearchCriteriaChange({
              status: selected.map((el) => el.value),
            })
          }
          isMulti={true}
        />
        <InputDateRange
          startDate={publishedDateStart}
          setStartDate={setPublishedDateStart}
          endDate={publishedDateEnd}
          setEndDate={setPublishedDateEnd}
          prefix={"Published Date: "}
          className={style.date_range}
        />
      </div>
      <AddButton to={"/home-content/promo/create"} text={"New Promo"} />
    </div>
  );
}
