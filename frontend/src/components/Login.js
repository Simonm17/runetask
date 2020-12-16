import React, { useState } from 'react';
import axios from 'axios';


function Login({ setToken, setUser, setMessage }){

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

            let authUser = localStorage.setItem('user', username);
            setUser(authUser);

            console.log(`
                ${authToken},
                ${username}
            `);

            setMessage(`Logged in as ${username}.`);
        })
        .catch(err => {
            console.log(err);
            setMessage(`You have entered invalid username and/or password.`);
        });
    }

    return (
        <form onSubmit={handleLoginSubmit}>

            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <input
                type="submit"
                value="Login"
            />

        </form>
    )
}

export default Login;