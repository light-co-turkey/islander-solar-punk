
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { Input, InputGroup, InputPrep } from '../ui/Inputs';
import { TextBtn } from '../ui/Buttons';
import { AlertCard } from '../ui/Cards';

const ForgotPassword = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");

    const [emailCheck, setEmailCheck] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    const timerRef = useRef();

    useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        []
    );

    const PostData = () => {
        // the Regex email validation was token from : https://emailregex.com/
        if (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            axios.post("/api/users/reset-pwd", { email })
                .then((res) => {
                    const data = res.data;
                    if (data.error) {
                        setEmailCheck(false);
                        setErrorMsg(true);
                    } else {
                        // make sure to not display another AlertCard instead
                        setEmailCheck(false);
                        setErrorMsg(false);
                        // show the confirmation message
                        setSuccessMsg(true);
                        // set a time before we redirect the user to login page
                        timerRef.current = setTimeout(() => {
                            history.push("/login");
                        }, 3000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setErrorMsg(false);
            setEmailCheck(true);
        }
    };

    return (
        <div className="dfc jc-c ai-c p-3 mxw-30r ma">
            <div className="p-3">
            {emailCheck ? (
                <AlertCard variant="warning">
                    Invalid Email format — check it out!
                </AlertCard>
            ) : null}
            {errorMsg ? (
                <AlertCard variant="warning">
                    No User exists with that email — check it Again !
                </AlertCard>
            ) : null}
            {successMsg ? (
                <AlertCard variant="success">
                    The reset password link has been sent — check out your email inbox !
                </AlertCard>
            ) : null}
            <h4 className="mb-5 mt-3">
                <b>Reset Password</b> below
            </h4>
            </div>
            <div className="mb-5">
                <InputGroup>
                <InputPrep variant="pillL">Email</InputPrep>
                <Input
                    variant="pillR"
                    name="email"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                </InputGroup>
            </div>
            <TextBtn variant="info" size="sm"
                onClick={() => PostData()}
            >
                Reset Password
            </TextBtn>
        </div>
    )
}


export default ForgotPassword