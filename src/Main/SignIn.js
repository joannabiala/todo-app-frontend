import React from "react";
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToMyProfile: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('http://127.0.0.1:8000/api/user/', data)
      .then((response) => {
        console.log(response);
        this.setState({redirectToMyProfile: true});

        const token = `Token ${response.data.token}`
        axios.defaults.headers.common['Authorization'] = token;

        localStorage.setItem('token', token);


      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {

    if (this.state.redirectToMyProfile) {
      return <Redirect to="/myprofile"/>;
    }

    return (
      <div>
        <h1>Rejestracja</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
          </label>
          <input type="text" placeholder="username" onChange={this.handleInputChange} value={this.state.username}/>
          <label>
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
          <button type="submit">Kliknij aby zarejestrować</button>
        </form>
      </div>
    )
  }
}