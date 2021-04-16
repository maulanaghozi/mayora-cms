import React, { useState } from 'react';
import { useHistory, Link, useRouteMatch, Redirect } from 'react-router-dom';
import { http } from '../../../utility/http';


import InputBox from '../../../components/Auth/AuthInputBox/AuthInputBox';
import AuthButton from '../../../components/Auth/AuthButton/AuthButton';

import { ReactComponent as LockIconDark } from '../../../assets/lock_dark.svg';
import { ReactComponent as LockIconLight } from '../../../assets/lock_light.svg';
import { ReactComponent as MailIconDark } from '../../../assets/mail_dark.svg';
import { ReactComponent as MailIconLight } from '../../../assets/mail_light.svg';

import { forgot } from './Login.module.scss';
import { validateEmail } from '../../../utility/utility';

import {useAlert} from 'react-alert';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [redirect, setRedirect] = useState(false);

    const alert = useAlert();

    const handleTextChange = e => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async () => {
        if (email && password) {
            if (validateEmail(email)) {
                try {
                    const params = {
                        method: 'post',
                        path: 'profiles/authentication/login/',
                        data: {
                            email: email,
                            password: password,
                            type: 'admin'
                        }
                    }
    
                    const data = await http(params);
    
                    if (data && data.code === 'success') {
                        localStorage.setItem('kestingrum-cms', data.payload.jwt);
                        setRedirect(true);
                    } else {
                        if (data) {
                            setEmailErrorMsg(data);
                        } else {
                            setEmailErrorMsg('Something\'s wrong, please contact our administrator');
                        }
                    }
                } catch (err) {
                    alert.error(err)
                }
            } else {
                setEmailErrorMsg('Your email address is invalid');
            }
        } else if (email) {
            setPasswordErrorMsg('Masukkan password');
        } else {
            setEmailErrorMsg('Masukkan alamat email');
        }
    }

    const emailAttr = {
        Icon: MailIconDark,
        FocusIcon: MailIconLight,
        inputAttr: {
            name: 'email',
            type: 'text',
            value: email,
            onChange: handleTextChange,
            placeholder: 'Email',
        },
        errorMsg: emailErrorMsg,
        setErrorMsg: setEmailErrorMsg
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
            <form onKeyDown={e => { if (e.key === 'Enter') { handleSubmit(); } }}>
                <InputBox {...emailAttr} />
                <InputBox {...passwordAttr} />
            </form>
            <AuthButton onClick={handleSubmit} text={'Login'} />
            <Link className={forgot} to={'/auth/forgot-password'}>FORGOT PASSWORD ?</Link>
            {redirect && <Redirect to={props.location.state ? props.location.state.from : '/dashboard'} />}
        </React.Fragment>
    );
}