import React from "react";
import "../css/app.css";
import PageTemplateComponent from "../Components/PageTemplateComponent";
import CalendarComponent from "../Components/CalendarComponent";
import MainEditorComponent from "../Components/MainEditorComponent";
import ListsAndTasksDisplayingComponent from "../Components/ListsAndTasksDisplayingComponent";


const MyProfile = () => {

  return (
    <div className="mainWrapper">
    <PageTemplateComponent>
      <div className="row" id="box">
        <div id="headerWrapper" className="col-12">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Fluid jumbotron</h1>
            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its
              parent.</p>
          </div>
        </div>
        </div>
      </div>
      <div id="mainColumns" className="row d-flex justify-content-between">
        <ListsAndTasksDisplayingComponent/>
        <MainEditorComponent/>
        <CalendarComponent/>
      </div>
    </PageTemplateComponent>
    </div>
  )
}

export default MyProfile