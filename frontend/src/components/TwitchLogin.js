import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const TwitchLogin = ({ params, setToken, setMessage }) => {

    const history = useHistory();

    // slices and returns code for backend code submission
    const accessCode = params.location.pathname.slice(13, 43);

    const codeParams = {
        'code': accessCode
    }

    const submitCode = () => {
        axios.post('http://localhost:8000/twitch/connect/', codeParams)
        .then(res => {
            console.log('putting token into locaStorage..');
            let token = localStorage.setItem('token', res.data.key);
            setToken(token);
            setMessage(['Logged in successfully with Twitch!']);
            history.push('/');
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        console.log('params:');
        console.log(params.location.pathname);
        console.log(`code: ${accessCode}`);
        submitCode();
    }, []);


    return (
        <>
        </>
    )
}

export default TwitchLogin;