import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import MainNavbarComponent from "./MainNavbarComponent";

class MyProfileNavbarComponent extends React.Component {
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
      <MainNavbarComponent>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"/>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search"/>

            <ButtonComponent
              type="submit"
              className="btn btn-outline-success my-2 my-sm-0  mr-sm-2"
              label="Search"
            />

            <ButtonComponent
              type="button"
              className="btn btn-outline-warning my-2 my-sm-0"
              handleClick={this.handleLogout}
              label="Logout"
            />
          </form>
        </div>
      </MainNavbarComponent>

    );
  }

}

export default MyProfileNavbarComponent;