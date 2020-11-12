import React, {useState} from "react";
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";


const SignIn = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToLogin, setRedirectToLogin] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    axios.post('http://127.0.0.1:8000/api/user/', data)
      .then((response) => {
        console.log(response);
        setRedirectToLogin(true);

        const token = `Token ${response.data.token}`
        axios.defaults.headers.common['Authorization'] = token;

        localStorage.setItem('token', token);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  if (redirectToLogin) {
    return <Redirect to="/login"/>;
  }

  return (
    <div>
      <h1>Rejestracja</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
        </label>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username}/>
        <label>
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Kliknij aby zarejestrować</button>
      </form>
    </div>
  )
}

export default SignIn