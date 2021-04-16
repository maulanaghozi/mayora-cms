import React from "react";
import { container, tagline } from "./PortfolioForm.module.scss";

import Title from "./Title";
import Talent from "./Talent";
import Description from "./Description";
import WithDescription from "./WithDescription";

export default function PortfolioForm(params) {
  return (
    <div className={container}>
      <p className={tagline}>{"PORTFOLIO DETAILS"}</p>
      <Title 
        createCriteria={params.createCriteria} 
        setCreateCriteria={params.setCreateCriteria} 
      />
      <Talent 
        createCriteria={params.createCriteria} 
        setCreateCriteria={params.setCreateCriteria}
        initialUser={params.initialUser}
      />
      <WithDescription
        createCriteria={params.createCriteria} 
        setCreateCriteria={params.setCreateCriteria} 
      />
      <Description 
        createCriteria={params.createCriteria} 
        setCreateCriteria={params.setCreateCriteria} 
      />
    </div>
  )
}