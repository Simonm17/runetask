import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation
} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import TwitchLogin from './components/TwitchLogin';
import Logout from './components/Logout';
import UserPage from './pages/User';
import Register from './components/Register';
import axios from 'axios';


function App() {

  const [token, setToken] = useState(null);
  const [authUser, setAuthUser] = useState('');

  const [message, setMessage] = useState([]);
  const clearMsg = () => {
    setMessage([]);
  }
  const displayMsg = message.map(msg => <li key={msg.indexOf(message)}>{msg}</li>)

  const checkToken = () => {
    setToken(localStorage.getItem('token'));
  }

  useEffect(() => {
    console.log(`triggering dj-rest-auth/user/ with token ${token}`);
    const config = {
      method: 'get',
      url: 'http://localhost:8000/dj-rest-auth/user/',
      headers: {
          Authorization: 'Token ' + token 
      }
  }
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
      <nav>
        {token ? 
          <Logout setToken={setToken} setMessage={setMessage} setAuthUser={setAuthUser} />
          :
          <Login setToken={setToken} setMessage={setMessage}/>
        }
      </nav>

      {message.length > 0 ?
        <ul>{displayMsg}<span onClick={clearMsg}>&times;</span></ul>
        :
        ''
      }
      <Switch>
        <Route path="/users/:user" render={routerProps => <UserPage username={routerProps} authUser={authUser}/>} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
