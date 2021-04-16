import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { http } from '../../../utility/http';

import AuthHeader from '../../../components/Auth/AuthHeader/AuthHeader';
import AuthButton from '../../../components/Auth/AuthButton/AuthButton';
import InputBox from '../../../components/Auth/AuthInputBox/AuthInputBox';

import { ReactComponent as LockIconDark } from '../../../assets/lock_dark.svg';
import { ReactComponent as LockIconLight } from '../../../assets/lock_light.svg';

const errorMessage = {
    invalid: 'Password must be longer than 8 character',
    empty: 'Enter your new password',
    failed: 'Something is wrong, please try agains'
}

export default function ResetPassword(props) {
    const [password, setPassword] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (props.location.state && props.location.state.resetPassword) {
            setResetPassword(props.location.state.resetPassword);
            history.replace({
                pathname: props.location.pathname,
                state: {}
            });
        }
    }, [])

    const handleTextChange = e => {
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async () => {
        if (password) {
            if (password.length > 8) {
                const params = {
                    method: 'POST',
                    path: 'profiles/authentication/reset/password',
                    data: {
                        new_password: password,
                        user_type: 'admin'
                    }
                }
                http(params)
                    .then((data) => {
                        if (data && data.code === 'success') {
                            setRedirect(true);
                        } else {
                            setPasswordErrorMsg(errorMessage.failed)
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                setPasswordErrorMsg(errorMessage.invalid)
            }
        } else {
            setPasswordErrorMsg(errorMessage.empty);
        }
    }

    const passwordAttr = {
        Icon: LockIconDark,
        FocusIcon: LockIconLight,
        inputAttr: {
            name: 'password',
            type: 'password',
            value: password,
            onChange: handleTextChange,
            placeholder: 'Password',
        },
        errorMsg: passwordErrorMsg,
        setErrorMsg: setPasswordErrorMsg
    }

    return (
        <React.Fragment>
            <AuthHeader
                primaryText={'Set New Password'}
                secondaryText={'Please enter your new password'}
            />
            <form onKeyDown={e => { if (e.key === 'Enter') { handleSubmit(); } }}>
                <InputBox {...passwordAttr} />
            </form>
            <AuthButton onClick={handleSubmit} text={'RENEW PASSWORD'} />
            {redirect && <Redirect to={{ pathname: '/auth/back-to-login', state: { backToLogin: true } }} />}
            {!(resetPassword || (props.location.state && props.location.state.resetPassword)) && <Redirect to={'/auth/login'} />}
        </React.Fragment>
    )
}