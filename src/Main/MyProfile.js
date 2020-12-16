import React from "react";
import "../css/app.css";
import PageTemplateComponent from "../Components/PageTemplateComponent";
import NavbarComponent from "../Components/NavbarComponent";
import JumbotronComponent from "../Components/JumbotronComponent";
import CalendarComponent from "../Components/CalendarComponent";
import ListsOverviewComponent from "../Components/ListsOverviewComponent";
import MainEditorComponent from "../Components/MainEditorComponent";
import ListsAndTasksDisplayingComponent from "../Components/ListsAndTasksDisplayingComponent";


const MyProfile = () => {

  return (
    <PageTemplateComponent>
      <NavbarComponent/>
      <JumbotronComponent/>
      <div id="mainColumns" className="row d-flex justify-content-between">
        <ListsAndTasksDisplayingComponent/>
        <MainEditorComponent/>
        <CalendarComponent/>
      </div>
    </PageTemplateComponent>
  )
}

export default MyProfile