import React from "react";
import ButtonComponent from "./ButtonComponent";
import NavbarComponent from "../Components/NavbarComponent";


const MainPage =(props)=>{
    return (
      <NavbarComponent>
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
      </NavbarComponent>
    )
}

export default MainPage