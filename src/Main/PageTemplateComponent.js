import React from "react";
import MyProfileNavbarComponent from "./MyProfileNavbarComponent";

const PageTemplateComponent = (props) => {
  return (
    <div>
      <MyProfileNavbarComponent/>
      <div className="page-content mx-auto col-md-7 col-sm-12">
        {props.children}
      </div>
    </div>

  )
}

export default PageTemplateComponent