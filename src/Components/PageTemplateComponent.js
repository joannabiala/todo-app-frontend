import React from "react";

const PageTemplateComponent = (props) => {
  return (
    <div id="pageTemplateComponent">
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default PageTemplateComponent;