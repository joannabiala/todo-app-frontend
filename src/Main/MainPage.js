import React from "react";
import MainNavbarComponent from "./MainNavbarComponent";
import ButtonComponent from "./ButtonComponent";


export default class MainPage extends React.Component {


  render() {
    return (
      <MainNavbarComponent>
        <ButtonComponent
          className="btn btn-outline-warning my-2 my-sm-0"
          type="submit"
          onClick={this.handleLogout}
          label="Login"
        />

        <ButtonComponent
          className="btn btn-outline-warning my-2 my-sm-0"
          type="submit"
          onClick={this.handleLogout}
          label="Sign in"
        />
      </MainNavbarComponent>

    )
  }
}