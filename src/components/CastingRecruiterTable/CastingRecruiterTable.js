import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { getCoverPic, getCastingType } from "../../utility/utility";

import { ReactComponent as ViewIcon } from "../../assets/eye_grey.svg";
import { ReactComponent as CastingIcon } from "../../assets/clapperboard.svg";
import { ReactComponent as MoreIcon } from "../../assets/more_horizontal.svg";

import style from "./CastingRecruiterTable.module.scss";

const header = [
	"Title",
	"Type",
	"Due Date",
	"Posted Date",
	"Status",
	"Action"
]

const headerClasses = [
	style.column_title,
	style.column_type,
	style.column_due_date,
	style.column_posted_date,
	style.column_status,
	style.column_action
]

export default function RecruiterCastingTable({ data }) {
	return (
		<div className={style.table_recruiter_casting}>
			<div className={style.table_header}>
				{header.map((head, index) => (
					<div key={index} className={style.table_cell + " " + headerClasses[index]}>{head}</div>
				))}
			</div>
			<div className={style.table_body}>
				{data && data.rows && data.rows.map((row, index) => (
					<div className={style.table_row} key={index}>
						{/* Title */}
						<div className={style.table_cell + " " + style.column_title}>
							<img src={getCoverPic(row.thumbnail.thumbnail_url)} alt={"pr_pic"} />
							<div>{row.title}</div>
						</div>
						{/* Type */}
						<div className={style.table_cell + " " + style.column_type}>
							<span style={{ textTransform: "capitalize" }}>{getCastingType(row.type)}</span>
							<span style={{ textTransform: "capitalize" }}>{row.production_type}</span>
						</div>
						{/* Due Date */}
						<div className={style.table_cell + " " + style.column_due_date}>
							<p>{row.due_date_open ? 'Open' : moment(row.due_date * 1000).format("DD MMM YYYY")}</p>
						</div>
						{/* Posted Date */}
						<div className={style.table_cell + " " + style.column_posted_date}>
							<p>{moment(row.created_at * 1000).format("DD MMM YYYY")}</p>
							<p>{moment(row.created_at * 1000).format("hh:mm:ss")}</p>
						</div>
						{/* Status */}
						<div className={style.table_cell + " " + style.column_status}>
							<span>{row.status}</span>
						</div>
						{/* Action */}
						<div className={style.table_cell + " " + style.column_action}>
							<Link to={"/casting/detail/"+ row.casting_id}><ViewIcon /></Link>
							<Link to={"/casting/view-applicant/"+ row.casting_id}><CastingIcon /></Link>
							<MoreIcon />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}