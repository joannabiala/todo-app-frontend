import React from "react";
import NavbarComponent from "./NavbarComponent";

const JumbotronComponent = () => {
  return (
    <div className="row" id="jumbotronComponent">
      <div>
        <NavbarComponent/>
      </div>
      <h5 className="">
        Hello you!
      </h5>
      <p className="lead">
        organize your day, start creating lists!
      </p>

    </div>
  )
}

export default JumbotronComponent;