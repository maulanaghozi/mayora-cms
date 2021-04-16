import React, { useState, useEffect, useRef } from 'react';
import StaffPickTalentPicker from "../StaffPickTalentPicker/StaffPickTalentPicker";
import style, { field, container_form, input } from './PortfolioForm.module.scss';
import { getProfilePic } from "../../utility/utility";

export default function Talent(params) {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [pickedTalent, setPickedTalent] = useState([]);

  const closeModal = () => {
    setModalIsOpened(false);
  }

  const handleAdd = newTalent => {
    setPickedTalent(newTalent);
    params.setCreateCriteria({user_id: newTalent[0].user_id})
    closeModal();
  }

  useEffect(() => {
    if(params.initialUser) {
      setPickedTalent([params.initialUser])
    }
  }, [])

  return (
    <div className={container_form}>
      <p className={field}>Talent :</p>
      <div className={style.talent_picked_wrapper}>
        {pickedTalent.length === 0 ? 
          <span onClick={() => setModalIsOpened(true)}>Pilih Talent</span> :
          <div className={style.talent_picked}>
            <div className={style.talent}>
              <div 
                className={style.profile_pic}
                style={{backgroundImage: `url(${getProfilePic(pickedTalent[0].profile_pic_url)})`}}
              ></div>
              <span>{pickedTalent[0].name}</span>
            </div>
            <span onClick={() => setModalIsOpened(true)}>{"Change Talent"}</span>
        </div>}
        <span className={style.note}>{"*hanya pilih 1 talent"}</span>
      </div>
      {
        modalIsOpened &&
        <StaffPickTalentPicker
          handleAdd={handleAdd}
          closeModal={closeModal}
          pickedTalent={pickedTalent}
        />
      }
    </div>
  )
}