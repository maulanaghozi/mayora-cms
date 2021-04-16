// Packages
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAlert } from "react-alert";

// Components
import WarningModal from "../../../components/WarningModal/WarningModal";

// Utility
import { http } from "../../../utility/http";

// Assets
import { ReactComponent as ViewIcon } from "../../../assets/eye.svg"
import { ReactComponent as CastingIcon } from "../../../assets/clapperboard.svg"
import { ReactComponent as MoreIcon } from "../../../assets/more_horizontal.svg"

// Style
import style from "../TalentTable.module.scss"

export default function Action(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWarning, setIsOpenWarning] = useState(null);
  const boxRef = useRef(null);
  const moreRef = useRef(null);
  const alert = useAlert();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (event) => {
    if(boxRef.current &&
      !boxRef.current.contains(event.target) && 
      moreRef.current &&
      !moreRef.current.contains(event.target)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if((props.openRow !== props.index) && isOpen) {
      setIsOpen(false)
    }
  },[props.openRow])

  const handleClick = () => {
    if(!isOpen) {
      props.setOpenRow(props.index)
    }
    setIsOpen(!isOpen)
  }

  const handleChangeStatus = (user_id, status) => {
    const params = {
      method: "POST",
      path: "profiles/authentication/activation",
      data: {
        user_id,
        status
      }
    }

    http(params).then(res => {
      if(res && res.code === "success") {
        props.setSessionId();
        props.setOpenRow(null);
      } else {
        alert.error(`ubah status talent ke ${status} gagal`)
      }
    })
  }
  
  const handleBlock = (id) => {
    const params = {
      method: "POST",
      path: 'profiles/authentication/block/' + id
    }

    http(params).then(res => {
      if(res && res.code === "success") {
        setIsOpenWarning(null)
        props.setSessionId()
      } else {
        setIsOpenWarning(null)
        alert.error("failed to block user")
      }
    })
  }

  const handleUnblock = (id) => {
    const params = {
      method: "POST",
      path: 'profiles/authentication/unblock/' + id
    }

    http(params).then(res => {
      if(res && res.code === "success") {
        props.setOpenRow(null)
        props.setSessionId()
      } else {
        setIsOpenWarning(null)
        alert.error("failed to unblock user")
      }
    })
  }

  return (
    <React.Fragment>
      <div className={classNames(
        style.table_cell, 
        style.column_action
      )}>
        <Link 
          to={`/user/talent/${props.row.user_id}`}
        >
          <ViewIcon />
        </Link>

        <Link 
          to={`/user/talent/${props.row.user_id}/casting-application`}
        >
          <CastingIcon />
        </Link>
        <div className={style.more_action}>
          <div 
            ref={moreRef}
            onClick={handleClick}
            className={classNames(
              style.more_container,
              {[style.open] : isOpen}
            )}
          >
            <MoreIcon />
          </div>
          {isOpen && 
            <div
              ref={boxRef}
              className={classNames(
                style.more_box,
                {[style.reverse] : props.index > props.totalRow - 3}
              )}
            >
              {
                props.row.status === "blocked" ?
                (
                  <div
                    className={style.more_text}
                    onClick={() => handleUnblock(props.row.user_id)}
                  >
                    {"Unblock"}
                  </div>
                ) :
                (
                  <>
                    <>
                      {
                        props.row.status === "unconfirmed" ?
                        <div
                          className={classNames(
                            style.more_text,
                            style.green
                          )}
                          onClick={() => handleChangeStatus(props.row.user_id, "active")}
                        >
                          {"Activate"}
                        </div>
                        :
                        <div
                          className={classNames(
                            style.more_text,
                            style.yellow
                          )}
                          onClick={() => handleChangeStatus(props.row.user_id, "unconfirmed")}
                        >
                          {"Deactivate"}
                        </div>
                      }
                    </>
                    <div
                      className={classNames(
                        style.more_text,
                        style.red
                      )}
                      onClick={() => setIsOpenWarning(props.row.user_id)}
                    >
                      {"Block"}
                    </div>
                  </>
                )
              }
            </div>
          }
        </div>
      </div>
      {isOpenWarning && 
        <WarningModal
          leftOption={"Yes"}
          leftAction={() => handleBlock(isOpenWarning)}
          rightOption={"Cancel"}
          rightAction={() => setIsOpenWarning(null)}
          close={() => setIsOpenWarning(null)}
          title={"Block Talent"}
          content={"Anda yakin block Talent ini?"}
        />
      }
    </React.Fragment>
  )
}