import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import UserPage from './pages/User';


function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  const checkToken = () => {
    setToken(localStorage.getItem('token'));
  }

  const checkUser = () => {
    setUser(localStorage.getItem('user'));
  }

  useEffect(() => {
    checkToken();
    checkUser();
  }, [token, user]);

  return (
    <BrowserRouter>
      <nav>
        {token ? 
          <Logout setToken={setToken} setUser={setUser} setMessage={setMessage}/> :
          <Login setToken={setToken} setUser={setUser} setMessage={setMessage}/>
        }
      </nav>

      {message &&
        <h5>{message}</h5>
      }
      <Switch>
        {user ?
          <Route path="/{user}">
            <UserPage username={user} /> :
          </Route>
          :
          <h5>Sign in to get user.</h5>
        }
        
      </Switch>

    </BrowserRouter>
  );
}

export default App;
