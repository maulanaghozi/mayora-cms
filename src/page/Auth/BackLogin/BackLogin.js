import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, useHistory } from 'react-router-dom';

import AuthHeader from '../../../components/Auth/AuthHeader/AuthHeader';
import AuthButton from '../../../components/Auth/AuthButton/AuthButton';

const errorMessage = {
    invalid: 'Password must be longer than 8 character',
    empty: 'Enter your new password',
    failed: 'Something is wrong, please try agains'
}

export default function ForgotPassword(props) {
    const [backToLogin, setBackToLogin] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (props.location.state && props.location.state.backToLogin) {
            setBackToLogin(props.location.state.backToLogin);
            history.replace({
                pathname: props.location.pathname,
                state: {}
            });
        }
    }, [])

    const handleSubmit = () => {
        history.push('/auth/login');
    }
    
    return (
        <React.Fragment>
            <AuthHeader
                primaryText={'Reset Password Success!'}
                secondaryText={['Your password has been renewed,', 'try login using your new password']}
            />
            <AuthButton onClick={handleSubmit} text={'BACK TO LOGIN'} />
            { !(backToLogin|| (props.location.state && props.location.state.backToLogin)) && <Redirect to={'/auth/login'} />}
        </React.Fragment>
    )
}