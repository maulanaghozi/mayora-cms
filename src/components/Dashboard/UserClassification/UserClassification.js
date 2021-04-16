import React from 'react';
import General from './GeneralClassification';
import Talent from './TalentClassification';
import Recruiter from './RecruiterClassification';

import {
    user_classification_container
} from './UserClassification.module.scss';

export default function UserClassification() {
    return (
        <div className={user_classification_container}>
			<General />
            <Talent />
            <Recruiter />
		</div>
    )
}
