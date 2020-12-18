import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusSquare, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const MainEditorComponent = ({list}) => {
  const [todoList, setTodoList] = useState([])
  const [list_name, setList_name] = useState('')
  const [activeItem, setActiveItem] = useState({
    id: null,
    title: '',
    completed: false,
    list: ''
  })

  const [editing, setEditing] = useState(false)
  const [redirectToMain, setRedirectToMain] = useState(false)
  const [isLoadingContent, setIsLoadingContent] = useState(true)
  const [isToggled, setToggled] = useState(false);
  const [isToggledTaskForm, setToggledTaskForm] = useState(false);

  const toggleTrueFalse = () => setToggled(!isToggled);
  const toggleTaskForm = () => setToggledTaskForm(!isToggledTaskForm);


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

  const refreshPage = () => {
    window.location.reload(false);
  }


  const handleDeleteList = (list) => {
    axios.delete('http://127.0.0.1:8000/api/list/' + list.id + '/').then(
      (response) => {
        fetchTasks()
        console.log(response);
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  const handleSubmitListName = (event) => {
    event.preventDefault();
    const data = {
      list_name: list_name
    }
    axios.post('http://127.0.0.1:8000/api/list/', data)
      .then((response) => {
        fetchTasks()
        refreshPage()
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const renderClickedList = (list) => {
    return (
      <div className="col-12">
        <div id="mainEditorListWrapper" href="#" className=" d-flex flex-row list-group-item flex-column align-items-start ">
          <h5 id="listName">
            {list.list_name}
          </h5>
          <div onClick={() => toggleTaskForm()}>
            <FontAwesomeIcon icon={faPlusSquare}/>
          </div>

          {isToggledTaskForm ? showTaskForm() : <div> Add new task</div>}

          {list.taski.map((task) => {
            return (
              <div id="tasksWrapper">
                <div id="taskTitle">
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
                <div>
                  <FontAwesomeIcon onClick={() => handleDelete(task)} icon={faTrashAlt}/>
                </div>
                <div>
                  <FontAwesomeIcon onClick={() => handleUpdate(task)} icon={faEdit}/>
                </div>
                <hr/>
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
      <div>
        <form id="form" className="row">
          <div className="col-12">
            <input
              id="title"
              className="form-control"
              name="title"
              placeholder="lists name"
              onChange={(e) => setList_name(e.target.value)}
              value={list_name}
            />
          </div>
          <div className="col-5">
            <button
              onClick={handleSubmitListName}
              id="submit"
              className="btn btn-primary"
              type="submit"
              name="add"
            >
              Create list
            </button>
          </div>
        </form>
      </div>
    )
  }


  const fetchTasks = () => {
    axios.get('http://127.0.0.1:8000/api/list/')
      .then((response) => {
        console.log(response)
        setTodoList(response.data)
        setIsLoadingContent(false)
        console.log(todoList)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  useEffect(() => {
    fetchTasks()
  }, [])


  const handleSubmitTask = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/tasks/', activeItem)
      .then((response) => {
        console.log(response);
        refreshPage()
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
    setEditing(true)

    if (editing === true) {
      setActiveItem({
        title: task.title,
        id: task.id,
        completed: task.completed
      })
    }
  }


  const handleDelete = (task) => {
    axios.delete('http://127.0.0.1:8000/api/tasks/' + task.id + '/').then(
      (response) => {
        fetchTasks()
        console.log(response);
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  const showTaskForm = () => {
    return (
      <form onSubmit={handleSubmitTask} id="form">
        <div>
          <input
            id="title"
            className="form-control"
            name="title"
            placeholder="nazwa taska"
            onChange={handleChange}
            value={activeItem.title}
          />
          <input
            id="submit"
            className="form-control"
            type="submit"
            name="add"
          />
        </div>
      </form>
    )
  }


  return (
    <div id="mainEditorComponent" className="root col-5">
      <div className="scrollIt">
        <div id="centerComponent" className="row">
          <div onClick={() => toggleTrueFalse()} className="col-2">
            <FontAwesomeIcon icon={faPlusSquare}/>
          </div>
          {isToggled ? showListForm() : <div> Add new list or choose existing one to edit </div>}
          {list ? renderClickedList(list) : null}
        </div>
      </div>
    </div>
  )
}

export default MainEditorComponent;