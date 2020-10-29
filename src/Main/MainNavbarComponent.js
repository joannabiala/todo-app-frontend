import React from "react";

const MainNavbarComponent = (props) => {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">TODOlist</a>
        <button
          className="navbar-toggler"
          type="button" data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarTogglerDemo02"
        >
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"/>
          <form className="form-inline my-2 my-lg-0">
            {props.children}
          </form>
        </div>
      </nav>
    </div>

  )
}

export default MainNavbarComponent;