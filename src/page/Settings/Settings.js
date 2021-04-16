import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TnC from './TnC/TnC';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import LandingPage from './LandingPage/LandingPage';
import MasterData from './MasterData/MasterData';

export default function Settings() {
    return (
        <React.Fragment>
            <Route exact path={'/settings/terms-n-conditions'} component={TnC} />
            <Route exact path={'/settings/privacy-policy'} component={PrivacyPolicy} />
            <Route exact path={'/settings/landing-page'} component={LandingPage} />
            <Route path={'/settings/master-data-details'} component={MasterData} />
            <Route
                exact
                path={'/settings'}
                render={() =>
                    <Redirect to={'/settings/terms-n-conditions'} />
                }
            />
        </React.Fragment>
    );
}