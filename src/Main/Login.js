import React, {useState} from "react";
import axios from 'axios';
import {Redirect} from "react-router-dom";


const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToMyProfile, setRedirectToMyProfile] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username,
      password
    };

    axios.post('http://127.0.0.1:8000/auth/', data)
      .then((response) => {

        const token = `Token ${response.data.token}`
        axios.defaults.headers.common['Authorization'] = token;

        localStorage.setItem('token', token);

        setRedirectToMyProfile(true);

      })
      .catch((error) => {
        console.log(error);
      })
  }


  if (redirectToMyProfile) {
    return <Redirect to="/myprofile"/>;
  }


  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
        </label>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Kliknij aby zalogować</button>
      </form>
    </div>
  )
}

export default Login;