import React, {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";


const NavbarComponent = () => {
  const [redirectToMain, setRedirectToMain] = useState(false)


  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
    setRedirectToMain(true);
  }


  if (redirectToMain) {
    return (<Redirect to="/main"/>)
  }

  return (
    <nav>
      <div className="row">
        <div className="col-5" id="logo">
          <h4>
            ToDooo!
          </h4>
        </div>
        <div className="col-7 d-flex flex-row-reverse">
          <button
            type="button"
            handleClick={handleLogout}
          >
            Settings
          </button>
          <button>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent;