import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import TwitchLogin from './components/TwitchLogin';
import Logout from './components/Logout';
import UserPage from './pages/User';
import axios from 'axios';
import styled from 'styled-components';


function App() {

  const [token, setToken] = useState(null);
  const [authUser, setAuthUser] = useState('');
  const [message, setMessage] = useState([]);
  const clearMsg = () => {
    setMessage([]);
  }

  // returns array of messages returned to message state by API calls
  const displayMsg = message.map(msg => <li key={msg.indexOf(message)}>{msg}</li>)

  const checkToken = () => {
    setToken(localStorage.getItem('token'));
  }

  const config = {
    method: 'get',
    url: 'http://localhost:8000/dj-rest-auth/user/',
    headers: {
        Authorization: 'Token ' + token 
    }
  }

  useEffect(() => {
    console.log(`triggering dj-rest-auth/user/ with token ${token}`);
    if (token) {
      axios(config)
      .then(res => setAuthUser(res.data.username))
      .catch(err => {
        console.log(err);
        console.log(`ERR token: ${token}`);
      });
    }
  }, [token]);

  useEffect(() => {
    console.log(`checkToken() triggered.`)
    checkToken();
  }, [token, message]);

  return (
    <BrowserRouter>
      <Route path="/twitch/:code" render={locationProps => <TwitchLogin params={locationProps} setMessage={setMessage} setToken={setToken} />}/>
      <Nav>
        <Link to="/">Home</Link>
        {token ? 
          <div>
            <Link to={{
              pathname: `/users/${authUser}`,
              state: { fromDashboard: true }
            }}>My tasks</Link>

            <Logout setToken={setToken} setMessage={setMessage} setAuthUser={setAuthUser} />
          </div>
          :
          <Login setToken={setToken} setMessage={setMessage}/>
        }
      </Nav>

      <div>
        {message.length > 0 ?
          <ul>{displayMsg}<span onClick={clearMsg}>&times;</span></ul>
          :
          <li>example message for styling!</li>
        }
      </div>
      <Switch>
        <Route path="/users/:user" render={routerProps => <UserPage username={routerProps} authUser={authUser}/>} />
      </Switch>

    </BrowserRouter>
  );
}

const Nav = styled.nav`
  border: transparent;
  border-radius: 25px;
  background-color: #1b1b1b;
  display: flex;
  justify-content: space-between;
  padding: 0 5vw;
  align-items: center;
  margin: 3%;
  height: 10vh;
  a {
    text-decoration: none;
    color: #e3cac8;
  }
  a:hover {
    /* animate underline? */
    text-decoration: underline;
    text-decoration-color: #e3cac8;
    cursor: pointer;
  }
  div {
    a {
      margin: 5px;
    }
  }
`

export default App;
