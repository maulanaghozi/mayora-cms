import React from 'react';
import { BrowserRouter as Router, Route, Link, useParams, Redirect } from 'react-router-dom';

import SettingsContainer from '../../../components/Settings/SettingsContainer/SettingsContainer';
import MasterSidebar from '../../../components/Settings/MasterSidebar/MasterSidebar';
import MasterEditor from '../../../components/Settings/MasterEditor/MasterEditor';

import {master_container} from './MasterData.module.scss';
import useHeader from '../../../hooks/useHeader/useHeader';

export default function MasterData() {
    return (
        <SettingsContainer wrapperStyle={{height: '100%'}}>
            <div className={master_container}>
                <MasterSidebar />
                <Route
                    exact
                    path={'/settings/master-data-details/location'}
                    render={() => 
                        <MasterEditor
                            name={'Location'}
                            attribute={'location'}
                            apiUrl={'profiles/master/location'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/production-type'}
                    render={() => 
                        <MasterEditor
                            name={'Production Type'}
                            attribute={'production_type'}
                            apiUrl={'posting/master/production-type'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/job-role'}
                    render={() => 
                        <MasterEditor
                            name={'Job Role'}
                            attribute={'job_role'}
                            apiUrl={'posting/master/job-role'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/ethnicity'}
                    render={() => 
                        <MasterEditor
                            name={'Ethnicity'}
                            attribute={'ethnicity'}
                            apiUrl={'profiles/master/ethnicity'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/body-type'}
                    render={() => 
                        <MasterEditor
                            name={'Body Types'}
                            attribute={'body_type'}
                            apiUrl={'profiles/master/body-type'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/hair'}
                    render={() => 
                        <MasterEditor
                            name={'Hair'}
                            attribute={'hair_type'}
                            apiUrl={'profiles/master/hair-type'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/skin'}
                    render={() => 
                        <MasterEditor
                            name={'Skin'}
                            attribute={'skin_color'}
                            apiUrl={'profiles/master/skin-color'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/clothes-size'}
                    render={() => 
                        <MasterEditor
                            name={'Clothes Size'}
                            attribute={'clothing_size'}
                            apiUrl={'profiles/master/clothes-size'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/experience'}
                    render={() => 
                        <MasterEditor
                            name={'Experience'}
                            attribute={'experience'}
                            apiUrl={'profiles/master/experience'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details/recruiter-type'}
                    render={() => 
                        <MasterEditor
                            name={'Recruiter Type'}
                            attribute={'recruiter_type'}
                            apiUrl={'profiles/master/recruiter-type'}
                        />
                    }
                />
                <Route
                    exact
                    path={'/settings/master-data-details'}
                    render={() =>
                        <Redirect
                            to={{
                                pathname: '/settings/master-data-details/location',
                                state: {
                                    name: 'Location',
                                    apiUrl: 'profiles/master/location',
                                    path: '/settings/master-data-details/location'
                                }
                            }}
                        />
                    }
                />
            </div>
        </SettingsContainer>
    )
}