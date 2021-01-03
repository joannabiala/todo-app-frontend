import React, {useState} from "react";
import axios from 'axios';
import "../css/app.css";
import PageTemplateComponent from "../Components/PageTemplateComponent";
import CalendarComponent from "../Components/CalendarComponent";
import MainEditorComponent from "../Components/MainEditorComponent";
import ListsAndTasksComponent from "../Components/ListsAndTasksComponent";
import {Redirect} from "react-router-dom";


const MyProfile = () => {

  const [index, setIndex] = useState(0)
  const [list, setList] = useState(null)
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
    <div className="mainWrapper">
      <PageTemplateComponent>
        <div className="row" id="box">
          <div id="headerWrapper" className="col-12 ">
            <div className="jumbotron jumbotron-fluid">
              <img id="logo" src="/default-monochrome-white.svg" alt="logo"/>
              <button onClick={handleLogout} id="logout-button" type="button" className="float-right btn">
                Logout
              </button>
              <div id="jumbotron-text-container" className="container">
                <h3 className="">
                  Hello you!
                </h3>
                <div className="dropdown">
                  <button
                    id="options-button"
                    type="button"
                    className="float-right
              dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Options
                  </button>
                  <div className="dropdown-menu" id="settings-dropdown" aria-labelledby="dropdownMenuButton">
                    <div>
                      <b>Settings</b>
                    </div>
                    Delete account
                    <div>
                      <button className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <p className="lead">
                  organize your day, start creating lists!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="mainColumns" className="row d-flex justify-content-between">
          <ListsAndTasksComponent
            onIndexChange={(index1) => setIndex(index1)}
            onListChange={(list1) => setList(list1)}
          />
          <MainEditorComponent index={index} list={list}/>
          <CalendarComponent/>
        </div>
      </PageTemplateComponent>
    </div>
  )
}

export default MyProfile