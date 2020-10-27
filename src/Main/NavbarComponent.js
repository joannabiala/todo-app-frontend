import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

class NavbarComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

      redirectToMain: false,


    }


    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
    this.setState({redirectToMain: true})
  }

  render() {

    if (this.state.redirectToMain) {
      return (<Redirect to="/main"/>)
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">TODOlist</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0"/>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0  mr-sm-2" type="submit">Search</button>
              <button onClick={this.handleLogout} className="btn btn-outline-warning my-2 my-sm-0" type="submit">
                Logout
              </button>
            </form>
          </div>
        </nav>
      </div>

    );
  }

}

export default NavbarComponent;