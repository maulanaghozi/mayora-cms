// Packages
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { useAlert } from "react-alert";

// Hooks
import useHeader from "../../../hooks/useHeader/useHeader";

// Components
import PageTitle from "../../../components/PageTitle/PageTitle";
import TalentCastingTable from "../../../components/TalentCastingTable/TalentCastingTable";
import TalentCastingFilter from "../../../components/TalentCastingFilter/TalentCastingFilter";
import Pagination from "../../../components/Pagination/Pagination";

// Utility
import { http } from "../../../utility/http";

// Style
import { container } from "./ViewTalentCasting.module.scss";

const searchAttributes = [
  "keyword",
  "type",
  "production_type",
  "application_status",
]

const initialState = {
  page: 1,
  rows: 10
}

searchAttributes.forEach(key => {
  initialState[key] = null
})

function ViewRecruiterCasting(props) {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [application_status, setApplicationStatus] = useState(null)
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
    application_status,
    sortBy,
    order,
    key
  }

  const setter = {
    page: setPage,
    rows: setRows,
    keyword: setKeyword,
    application_status: setApplicationStatus,
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
    debounceGetTalentCasting(searchCriteria)
  },[
    page,
    rows,
    keyword,
    application_status,
    sortBy,
    order,
    user_id
  ])

  const getTalentCasting = (criteria) => {
    const params = {
      method: "GET",
      path: `posting/casting/talent/my-casting`,
      query: {
        page: criteria.page,
        rows: criteria.rows,
        sortBy: criteria.sortBy,
        order: criteria.order,
        talent_id: user_id
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

  const debounceGetTalentCasting = debounce(200, getTalentCasting)

  useHeader({
      title: ["user", "talent", `${props.talentData.name}`, "View Applications"],
      path: ["/user/telent", "/user/talent", `/user/talent/${user_id}`, `/user/talent/${user_id}/casting-application`]
  })

  return (
    <div className={container}>
      <PageTitle
        title={["View Applications"]}
        path={[`/user/talent/${user_id}/casting-application`]}
        returnable={true}
        backTo={`/user/talent/${user_id}`}
      />
      <TalentCastingFilter
        handleSearchCriteriaChange={setSearchCriteria}
        searchCriteria={searchCriteria}
      />
      {result && <TalentCastingTable 
        data={result.rows}
        searchCriteria={searchCriteria}
        handleSearchCriteriaChange={setSearchCriteria}
        setKey={() => setSearchCriteria({
            key: key + 1
        })}
      />}
      <Pagination
        data={result}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
      />
    </div>
  )
}

export default function ViewRecruiterCastingWrapper() {
  const [data, setData] = useState(null);
  const alert = useAlert();
  const {user_id} = useParams();

  useEffect(() => {
    getTalentDetail(user_id);
  }, [user_id])

  const getTalentDetail = (id) => {
    const params = {
      method: 'get',
      path: `profiles/talent/${id}`
    }

    http(params)
      .then(res => {
        if (res && res.code === 'success') {
          setData(res.payload);
        } else {
          alert.error('failed to fetch user data');
          console.error('failed to fetch user data');
        }
      })
  }

  return (
    <>
      {
        data &&
        <ViewRecruiterCasting talentData={data}/>
      }
    </>
  )
}