import React, { useState, useEffect } from 'react';
import TalentFilter from '../TalentFilter/TalentFilter';
import TalentSelector from '../TalentSelector/TalentSelector';
import RecruiterFilter from '../RecruiterFilter/RecruiterFilter';
import RecruiterSelector from '../RecruiterSelector/RecruiterSelector';

export default function GroupMemberSelector() {
    const [currentType, setCurrentType] = useState('talent');

    const [selectedTalent, setSelectedTalent] = useState({ total: 0, hash: {} });
    const [talentSearchCriteria, setTalentSearchCriteria] = useState({ keyword: '', verified: '', location: '', gender: '', age: [0, 100], height: [40, 230], weight: [0, 200] });

    const [selectedRecruiter, setSelectedRecruiter] = useState({ total: 0, hash: {} });
    const [recruiterSearchCriteria, setRecruiterSearchCriteria] = useState({});

    // useEffect(() => {
    //     console.log(talentSearchCriteria)
    // })

    return (
        <React.Fragment>
            {
                currentType === 'talent' ?
                    <React.Fragment>
                        <TalentFilter
                            searchCriteria={talentSearchCriteria}
                            setSearchCriteria={setTalentSearchCriteria}
                            selected={{ talent: selectedTalent.total, recruiter: selectedRecruiter.total }}
                        />
                        <TalentSelector
                            selected={selectedTalent}
                            setSelected={setSelectedTalent}
                        />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <RecruiterFilter selected={{ talent: selectedTalent.total, recruiter: selectedRecruiter.total }} />
                        <RecruiterSelector selected={selectedRecruiter} setSelected={setSelectedRecruiter} />
                    </React.Fragment>
            }
        </React.Fragment>
    )
}
