import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

function Login({ setToken, setMessage }){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = e => {
        e.preventDefault();

        const loginData = {
            'username': username,
            'password': password
        };

        axios.post('http://localhost:8000/dj-rest-auth/login/', loginData)
        .then(res => {

            let authToken = localStorage.setItem('token', res.data.key);
            setToken(authToken);

            // use username from local storage to use outside of url param handling
            let authUser = localStorage.setItem('user', username);

            setMessage([`Logged in as ${username}.`]);
        })
        .catch(err => {
            console.log(err);
            setMessage(`You have entered invalid username and/or password.`);
        });
    }

    return (
        <Button href="http://localhost:8000/auth/login">
            <FontAwesomeIcon icon={faTwitch} /> Log In
        </Button>
    )
}

// Current a tag styling attributes are controlled by Nav styled component.
// e.g. Button {text-decoration:none} won't work
// because Nav controls text-decoration in its styling.
// to modify Button, add classes in Nav to separate Button a-tag from rest of Nav.
const Button = styled.a`
    svg {
        color:  #6441a5;
    }
`;

export default Login;