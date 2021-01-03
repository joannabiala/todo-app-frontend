import React, {useCallback, useEffect, useState} from "react";
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
  const [todoList, setTodoList] = useState([])
  const [redirectToMain, setRedirectToMain] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
    setRedirectToMain(true);
  }


  const fetchTasks = useCallback(() => {
    axios.get('http://127.0.0.1:8000/api/list/')
      .then((response) => {
        console.log(response)

        setTodoList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])


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
                <p className="lead">
                  organize your day, start creating lists!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="mainColumns" className="row d-flex justify-content-between">
          <ListsAndTasksComponent
            todoList={todoList}
            fetchTasks={fetchTasks}
            onListChange={(list1) => setList(list1)}
          />
          <MainEditorComponent list={list} fetchTasks={fetchTasks}/>
          <CalendarComponent/>
        </div>
      </PageTemplateComponent>
    </div>
  )
}

export default MyProfile