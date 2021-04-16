import React, {useState} from 'react';
import Content from '../../../components/Content/Content';
import PageTitle from '../../../components/PageTitle/PageTitle';
import BoxButton from '../../../components/BoxButton/BoxButton';
import GroupForm from '../../../components/GroupForm/GroupForm';
import GroupMemberSelector from '../../../components/GroupMemberSelector/GroupMemberSelector';
import { container, header, body } from './CreateGroup.module.scss';
import useHeader from '../../../hooks/useHeader/useHeader';

export default function CreateGroup() {
    const [searchCriteria, setSearchCriteria] = useState({group_name: ''});
    useHeader({
        title: ['Group', 'Create New Group'],
        path: ['/group', '/group/create']
    });
    const createNewGroup = () => {
        
    }

    const handleChange = newSearchCriteria => {
        setSearchCriteria({...searchCriteria, ...newSearchCriteria});
    }

    return (
        <div className={container}>
            <div className={header}>
                <PageTitle  title={['Create New Group']} path={['/group/create']} returnable={true} backTo={'/group'} />
                <BoxButton text={'Create Group'} onClick={createNewGroup} />
            </div>
            <div className={body}>
                <GroupForm searchCriteria={searchCriteria} setSearchCriteria={handleChange} />
                <GroupMemberSelector searchCriteria={searchCriteria} setSearchCriteria={setSearchCriteria} />
            </div>
        </div>
    )
}
