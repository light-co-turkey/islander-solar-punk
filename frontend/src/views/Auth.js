import React, { useEffect } from 'react';
import { LinkTextBtn } from '../components/ui/Buttons';

export const Auth = props => {

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="df jc-c ai-c" style={{ height: "calc(100vh - 15rem)" }}>
            <LinkTextBtn variant="info" href="#/signup" size="md" >Sign Up</LinkTextBtn>
            <b style={{fontSize: "2rem", marginLeft: "1rem"}}>/</b>
            <LinkTextBtn variant="info" href="#/login" size="md" className="ml-3">Log In</LinkTextBtn>
        </div>
    )
}