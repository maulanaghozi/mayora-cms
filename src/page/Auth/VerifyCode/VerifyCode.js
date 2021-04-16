import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { http } from '../../../utility/http';

// OTP
import AuthHeader from '../../../components/Auth/AuthHeader/AuthHeader';
import AuthButton from '../../../components/Auth/AuthButton/AuthButton';
import InputBox from '../../../components/Auth/AuthInputBox/AuthInputBox';
import AuthTimer from '../../../components/Auth/AuthTimer/AuthTimer';
import { ReactComponent as KeyIconDark } from '../../../assets/key_dark.svg';
import { ReactComponent as KeyIconLight } from '../../../assets/key_light.svg';
import { resend, footer } from './VerifyCode.module.scss';

// Reset Password
import { ReactComponent as LockIconDark } from '../../../assets/lock_dark.svg';
import { ReactComponent as LockIconLight } from '../../../assets/lock_light.svg';

const otpErrorMessage = {
    invalid: 'Verification code is 6 character long',
    empty: 'Enter security code that was sent to your email',
    failed: 'Your verification code is invalid',
    timeUp: 'Your verification code has expired, please resend another code',
    resendFailed: 'Resend failed, please try again'
}

const resetErrorMessage = {
    invalid: 'Password must be longer than 8 character',
    empty: 'Enter your new password',
    failed: 'Something is wrong, please try agains'
}

export default function VerifyCode(props) {
    // OTP
    const [otp, setOtp] = useState('');
    const [otpErrorMsg, setOtpErrorMsg] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [resetCount, setResetCount] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState('')
    // Reset Password
    const [password, setPassword] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (props.location.state && props.location.state.email) {
            setEmail(props.location.state.email);
            history.replace({
                pathname: props.location.pathname,
                state: {}
            });
        }
    }, [])

    const resetTimer = () => {
        setResetCount(resetCount + 1);
    }

    const setOtpErrorOrTimeUpError = error => {
        if (!timeUp) {
            setOtpErrorMsg(error);
        } else {
            setOtpErrorMsg(otpErrorMessage.timeUp);
        }
    }

    const handleTextChange = e => {
        if (e.target.name === 'otp') {
            setOtp(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmitOTP = async () => {
        if (otp) {
            const params = {
                method: 'POST',
                path: 'profiles/authentication/reset/password/verify-otp',
                data: {
                    email: email,
                    otp: otp
                }
            }
            http(params)
                .then(res => {
                    if (res && res.code === 'success') {
                        setIsVerified(true)
                        setToken(res.payload)
                    } else {
                        setOtpErrorOrTimeUpError(otpErrorMessage.failed);
                    }
                })
                .catch(err => console.error(err));
        } else {
            setOtpErrorOrTimeUpError(otpErrorMessage.empty)
        }
    }

    const handleSubmitReset = async () => {
        if (password) {
            if (password.length > 8) {
                const params = {
                    method: 'POST',
                    path: 'profiles/authentication/reset/password',
                    data: {
                        new_password: password,
                        user_type: 'admin'
                    },
                    token
                }
                http(params)
                    .then((data) => {
                        if (data && data.code === 'success') {
                            setRedirect(true);
                        } else {
                            setPasswordErrorMsg(resetErrorMessage.failed)
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                setPasswordErrorMsg(resetErrorMessage.invalid)
            }
        } else {
            setPasswordErrorMsg(resetErrorMessage.empty);
        }
    }

    const handleResend = async () => {
        const params = {
            method: 'POST',
            path: 'profiles/authentication/password/forgot/request-otp/',
            data: {
                email: email
            }
        }
        http(params)
            .then((data) => {
                if (data && data.code === 'success') {
                    setOtpErrorMsg('Verification code has been resent');
                    resetTimer();
                    setTimeUp(false);
                } else {
                    setOtpErrorOrTimeUpError(otpErrorMessage.resendFailed)
                }
            })
            .catch(err => console.error(err));
    }

    const handleTimerEnd = () => {
        setTimeUp(true);
        setOtpErrorMsg(otpErrorMessage.timeUp)
    }

    const otpAttr = {
        Icon: KeyIconDark,
        FocusIcon: KeyIconLight,
        inputAttr: {
            name: 'otp',
            type: 'text',
            value: otp,
            onChange: handleTextChange,
            placeholder: 'Enter the code here',
        },
        errorMsg: otpErrorMsg,
        setErrorMsg: setOtpErrorMsg
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

    const renderVerifiedCode = () => {
        return (
            <React.Fragment>
                <AuthHeader
                    primaryText={'Verification Code'}
                    secondaryText={'Enter security code that was sent to your email'}
                />
                <form onKeyDown={e => { if (e.key === 'Enter') { handleSubmitOTP(); } }}>
                    <InputBox {...otpAttr} />
                </form>
                <AuthButton onClick={handleSubmitOTP} text={'RESET PASSWORD'} />
                <div className={footer}>
                    <div className={resend} onClick={handleResend}>Send other code</div>
                    <AuthTimer onTimerEnd={handleTimerEnd} resetCount={resetCount} />
                </div>
            </React.Fragment>
        )
    }

    const renderResetPassword = () => {
        return (
            <React.Fragment>
                <AuthHeader
                    primaryText={'Set New Password'}
                    secondaryText={'Please enter your new password'}
                />
                <form onKeyDown={e => { if (e.key === 'Enter') { handleSubmitReset(); } }}>
                    <InputBox {...passwordAttr} />
                </form>
                <AuthButton onClick={handleSubmitReset} text={'RENEW PASSWORD'} />
                {redirect && <Redirect to={{ pathname: '/auth/back-to-login', state: { backToLogin: true } }} />}
                {/* {!(resetPassword || (props.location.state && props.location.state.resetPassword)) && <Redirect to={'/auth/login'} />} */}

            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {isVerified ? renderResetPassword() : renderVerifiedCode()}
        </React.Fragment>
    )
}