import React from "react";

const JumbotronComponent = () =>{
  return(
    <div className="row" id="jumbotronComponent">
      <div className="col-12">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Fluid jumbotron</h1>
            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its
              parent.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JumbotronComponent;