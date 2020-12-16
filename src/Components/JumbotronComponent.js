import React from "react";

const JumbotronComponent = () =>{
  return(
    <div className="row" id="jumbotronComponent">
      <div className="col-12">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h5 className="display-4">
              Hello you!
            </h5>
            <p className="lead">
              organize your day, start creating lists!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JumbotronComponent;