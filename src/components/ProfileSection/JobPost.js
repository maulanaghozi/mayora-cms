// Packages
import React, { useState, useEffect } from "react";
import { debounce } from "throttle-debounce";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

// Components
import Pagination from "../Pagination/Pagination";

// Utility
import { http } from "../../utility/http";
import TableRecruiterCasting from "../CastingRecruiterTable/CastingRecruiterTable";
import style from "./ProfileSection.module.scss";

const searchAttributes = [
  "keyword",
  "type",
  "production_type",
]

const initialState = {
  page: 1,
  rows: 10
}

searchAttributes.forEach(key => {
  initialState[key] = null
})

export default function DetailRecruiter(props) {

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("updated_at");
  const [order, setOrder] = useState("DESC");
  const [key, setKey] = useState(1);
  const [result, setResult] = useState(null)
  const { user_id } = useParams()
  const alert = useAlert()

  const searchCriteria = {
    page,
    rows,
    keyword,
    sortBy,
    order,
    key
  }

  const setter = {
    page: setPage,
    rows: setRows,
    keyword: setKeyword,
    sortBy: setSortBy,
    order: setOrder,
    key: setKey
  }

  const setSearchCriteria = newCriteria => {
    for(let key in newCriteria) {
      setter[key](newCriteria[key]);
    }
  }

  useEffect(() => {
    debounceGetRecruiterCasting(searchCriteria)
  },[
    page,
    rows,
    keyword,
    sortBy,
    order,
    user_id
  ])

  const getRecruiterCasting = (criteria) => {
    const params = {
      method: "GET",
      path: `posting/casting/search`,
      query: {
        page: criteria.page,
        rows: criteria.rows,
        sortBy: criteria.sortBy,
        order: criteria.order,
        recruiter_id: user_id
      }
    }

    searchAttributes.map(key => {
      if(
        criteria[key] !== null &&
        criteria[key] !== undefined &&
        criteria[key] !== ""
      ) {
        params.query[key] = criteria[key]
      }
    })

    http(params)
      .then(res => {
        if (res && res.code === "success") {
          setResult(res.payload)
        } else {
          alert.error('failed to fetch casting data')
        }
      })
  }

  const debounceGetRecruiterCasting = debounce(200, getRecruiterCasting)

  return (
    <div className={style.job_container}>
      <TableRecruiterCasting data={result} />
      <Pagination
        data={result}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
      />
    </div>
  )
}