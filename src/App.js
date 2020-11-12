import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';

import SignIn from "./Main/SignIn";
import LogIn from "./Main/Login";
import MyProfile from "./Main/MyProfile";
import MainPage from "./Main/MainPage";

axios.defaults.withCredentials = true;

const App = () =>{

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
  },[])

    return (
      <Router>
        <div>
          <Switch>
            <Route path="/signin">
              <SignIn/>
            </Route>
            <Route path="/main">
              <MainPage/>
            </Route>
            <Route path="/login">
              <LogIn/>
            </Route>
            <Route path="/myprofile">
              <MyProfile/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
}


export default App