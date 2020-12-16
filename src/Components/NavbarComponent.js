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
    <div className="row">
      <div id="logo">
        <h4>
          ToDooo!
        </h4>
      </div>
      <div className=" d-flex flex-row-reverse">
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
  )
}

export default NavbarComponent;