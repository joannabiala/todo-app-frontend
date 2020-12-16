import React from "react";
import "../css/app.css";
import PageTemplateComponent from "../Components/PageTemplateComponent";
import NavbarComponent from "../Components/NavbarComponent";
import JumbotronComponent from "../Components/JumbotronComponent";
import CalendarComponent from "../Components/CalendarComponent";
import ListsOverviewComponent from "../Components/ListsOverviewComponent";
import MainEditorComponent from "../Components/MainEditorComponent";


const MyProfile = () => {

  return (
    <PageTemplateComponent>
      <NavbarComponent/>
      <JumbotronComponent/>
      <div className="row">

      <ListsOverviewComponent/>
      <MainEditorComponent/>
      <CalendarComponent/>
      </div>
    </PageTemplateComponent>
  )
}

export default MyProfile