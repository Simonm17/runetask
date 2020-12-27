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

  const [message, setMessage] = useState('');
  const clearMsg = () => {
    setMessage('');
  }

  const checkToken = () => {
    setToken(localStorage.getItem('token'));
  }


  useEffect(() => {
    checkToken();
  }, [token, message]);

  return (
    <BrowserRouter>
      <nav>
        {token ? 
          <Logout setToken={setToken} setMessage={setMessage}/> :
          <Login setToken={setToken} setMessage={setMessage}/>
        }
      </nav>

      {message &&
        <h5>{message} <span onClick={clearMsg}>&times;</span></h5>
      }
      <Switch>
        <Route path="/:user" render={routerProps => <UserPage username={routerProps} />} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
