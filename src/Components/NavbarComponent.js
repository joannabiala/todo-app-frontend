import React from "react";

const NavbarComponent = ()=>{
  return(
    <nav className="row">
      <div id="logo">
        <h4>
          ToDooo!
        </h4>
      </div>

      <button>
        Settings
      </button>
      <button>
        Logout
      </button>
    </nav>
  )
}

export default NavbarComponent;