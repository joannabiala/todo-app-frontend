import React from "react";
import MainNavbarComponent from "./MainNavbarComponent";
import ButtonComponent from "./ButtonComponent";


const MainPage =(props)=>{
    return (
      <MainNavbarComponent>
        <ButtonComponent
          className="btn btn-outline-warning my-2 my-sm-0"
          type="submit"
          onClick={props.handleLogout}
          label="Login"
        />

        <ButtonComponent
          className="btn btn-outline-warning my-2 my-sm-0"
          type="submit"
          onClick={props.handleLogout}
          label="Sign in"
        />
      </MainNavbarComponent>

    )
}

export default MainPage