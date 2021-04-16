import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

import CreatePortfolio from "../CreatePortfolio/CreatePortfolio";

import { http } from "../../../utility/http";

export default function EditPortfolio() {
    const [ready, setReady] = useState(false);
    const [initialData, setInitialData] = useState(null);

    const {id} = useParams();

    const alert = useAlert();

    useEffect(() => {
        http({
            method: "GET",
            path: `promotion/portfolio/${id}`
        })
        .then(res => {
            if (res && res.code === "success") {
                setInitialData(res.payload);
                setReady(true);
            } else {
                alert.error(res.message);
            }
        })

    }, []);
    return (
        <React.Fragment>
            {
                ready ?
                <CreatePortfolio
                    type="edit"
                    id={initialData.id}
                    thumbnail={initialData.thumbnail_url}
                    title={initialData.title}
                    user_id={initialData.user.user_id}
                    description={initialData.description}
                    status={initialData.status}
                    video_url={initialData.video_url}
                    published_at={initialData.published_at}
                    initialUser={initialData.user}
                /> :
                <span>Loading...</span>
            }
        </React.Fragment>
    );
}