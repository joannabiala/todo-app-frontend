import React, {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusSquare, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const MainEditorComponent = ({list, fetchTasks}) => {
  const [list_name, setList_name] = useState('')
  const [activeItem, setActiveItem] = useState({
    id: null,
    title: '',
    completed: false,
    list: ''
  })

  const [redirectToMain, setRedirectToMain] = useState(false)
  const [isToggled, setToggled] = useState(false);
  const [isToggledNewTaskForm, setToggledNewTaskForm] = useState(false);
  const [isToggledUpdateTaskForm, setToggledUpdateTaskForm] = useState(false);

  const toggleTrueFalse = () => setToggled(!isToggled);
  const toggleNewTaskForm = () => {
    setToggledNewTaskForm(!isToggledNewTaskForm);
    setToggledUpdateTaskForm(false);
  }

  const handleDelete = (task) => {
    axios.delete('http://127.0.0.1:8000/api/tasks/' + task.id + '/').then(
      (response) => {
        fetchTasks();
        console.log(response);
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value

    console.log('name: ', name)
    console.log('value: ', value)

    setActiveItem({
      ...activeItem,
      title: value,
      list: list.id
    })
  }


  const handleSubmitListName = (event) => {
    event.preventDefault();
    const data = {
      list_name: list_name
    }
    axios.post('http://127.0.0.1:8000/api/list/', data)
      .then((response) => {
        console.log(response)
        fetchTasks()
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const renderClickedList = (list) => {
    return (
      <div id="clickedListWrapper" className="col-12">
        <div id="mainEditorListWrapper" className=" d-flex flex-row list-group-item flex-column  ">

          <div id="mainEditorAddTask" className="row">
            <div className="col-11">
              <h5 id="listName">
                {list.list_name}
              </h5>
            </div>
            <div className="col-1">
              <FontAwesomeIcon onClick={() => toggleNewTaskForm()} icon={faPlusSquare}/>
            </div>
          </div>


          {isToggledNewTaskForm ? showAddNewTaskForm() : null}

          {isToggledUpdateTaskForm ? showEditTaskForm() : null}

          {list.taski.map((task) => {
            return (
              <div className="row" id="tasksWrapper">
                <div className="col-6" id="taskTitle">
                <span onClick={() => handleComplete(task)}>
                  {task.completed === false
                    ?
                    (<span>
                      {task.title}
                      {task.completed}
                    </span>)
                    :
                    (<del>
                        <p>
                          {task.title}
                        </p>
                        {task.completed}
                      </del>
                    )}
                </span>
                </div>
                <div className="col-3">
                  <FontAwesomeIcon id="icon" onClick={() => handleDelete(task)} icon={faTrashAlt}/>
                  <FontAwesomeIcon id="icon" onClick={() => handleUpdate(task)} icon={faEdit}/>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }


  const showListForm = () => {
    return (
      <React.Fragment>
        <div className="col-7">
          <input
            id="title"
            name="title"
            placeholder=" list name"
            onChange={(e) => setList_name(e.target.value)}
            value={list_name}
          />
        </div>
        <div className="col-4">
          <button
            onClick={handleSubmitListName}
            id="submit"
            className="btn btn-primary"
            type="submit"
            name="add"
          >
            Add list
          </button>
        </div>
      </React.Fragment>
    )
  }

  const handleSubmitNewTask = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/tasks/', activeItem)
      .then((response) => {
        fetchTasks()
      })
      .catch((error) => {
        console.log(error);
      })
  }


  const handleEditTask = (event) => {
    event.preventDefault();
    axios.put('http://127.0.0.1:8000/api/tasks/' + activeItem.id + '/', activeItem)
      .then((response) => {
        console.log(response);
        setToggledUpdateTaskForm(false);
        fetchTasks()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  if (redirectToMain) {
    return (<Redirect to="/main"/>)
  }


  const handleComplete = (task) => {
    task.completed = !task.completed
    console.log(task.title)
    console.log(task.completed)

    axios.patch('http://127.0.0.1:8000/api/tasks/' + task.id + '/', task).then(
      (response) => {
        setActiveItem(task.completed)
        console.log(response)
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  const handleUpdate = (task) => {
    console.log('editing.........')
    console.log(task.title)
    setToggledUpdateTaskForm(true)
    setToggledNewTaskForm(false)

    setActiveItem({
      title: task.title,
      id: task.id,
      completed: task.completed
    })
  }


  const showAddNewTaskForm = () => {
    return (
      <form onSubmit={handleSubmitNewTask} id="form">
        <div className="row" id="add-task-form">
          <div className="col-8">
            <input
              id="title"
              className="form-control"
              name="title"
              placeholder=" task name"
              onChange={handleChange}
              value={activeItem.title}
            />
          </div>
          <div className="col-4">
            <button
              id="submit"
              className="btn btn-primary"
              type="submit"
              name="add"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    )
  }

  const showEditTaskForm = () => {
    return (
      <form onSubmit={handleEditTask} id="form">
        <div className="row" id="add-task-form">
          <div className="col-8">
            <input
              id="title"
              className="form-control"
              name="title"
              placeholder=" task name"
              onChange={handleChange}
              value={activeItem.title}
            />
          </div>
          <div className="col-4">
            <button
              id="submit"
              className="btn btn-primary"
              type="submit"
              name="add"
            >
              Update Task
            </button>
          </div>
        </div>
      </form>
    )
  }


  return (
    <div id="mainEditorComponent" className="root col-xs-12  col-sm-12 col-md-6 col-lg-6 col-xl-5">
      <div className="scrollIt">
        <div id="centerComponent">
          <div className="row" id="toggleWrapper">
            <div onClick={() => toggleTrueFalse()} className="col-1">
              <FontAwesomeIcon icon={faPlusSquare}/>
            </div>
            {isToggled ? showListForm() :
              <div className="col-11"> Add a new list or select an existing one to add tasks to it</div>}
          </div>
          {list ? renderClickedList(list) : null}
        </div>
      </div>
    </div>
  )
}

export default MainEditorComponent;