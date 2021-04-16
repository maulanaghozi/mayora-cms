import React, { useState } from 'react';

import TotalCard from './TotalCard/TotalCard';
import UserJoinChart from './UserJoinChart/UserJoinChart';

import { ReactComponent as UserIcon } from '../../../assets/total_user.svg';
import { ReactComponent as JobIcon } from '../../../assets/total_job.svg';
import { ReactComponent as GroupIcon } from '../../../assets/total_group.svg';

import {
    user_join, total_panel, card_wrapper, chart_wrapper
} from './UserJoin.module.scss'

export default function UserJoin() {
    const [range, setRange] = useState('week');

    return (
        <div className={user_join}>
        	<div className={total_panel}>
				<div className={card_wrapper}>
        	    	<TotalCard
        	    	    title={'total user'}
        	    	    Icon={UserIcon}
                        apiUrl={'profiles/summary/total-user'}
                        range={range}
        	    	/>
				</div>
				<div className={card_wrapper}>
					<TotalCard
        	    	    title={'total job'}
        	    	    Icon={JobIcon}
                        apiUrl={'posting/summary/total-casting'}
                        range={range}
        	    	/>
				</div>
				<div className={card_wrapper}>
					<TotalCard
        	    	    title={'total group'}
        	    	    Icon={GroupIcon}
                        apiUrl={'posting/summary/total-group'}
                        range={range}
        	    	/>
				</div>
        	</div>
			<div className={chart_wrapper}>
        		<UserJoinChart
					range={range}
					setRange={setRange} />
			</div>
		</div>
    )
}
