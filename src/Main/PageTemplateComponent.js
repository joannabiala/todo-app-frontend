import React from "react";
import NavbarComponent from "./NavbarComponent";

const PageTemplateComponent = (props) => {
  return (
    <div className="wrapper">
      <NavbarComponent/>
      <div className="page-content mx-auto col-md-7 col-sm-12">
        {props.children}
      </div>
    </div>

  )
}

export default PageTemplateComponent