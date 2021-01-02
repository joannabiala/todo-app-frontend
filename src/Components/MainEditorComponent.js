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
      <div id="wrapper-XD" className="col-12">
        <div id="mainEditorListWrapper" href="#" className=" d-flex flex-row list-group-item flex-column  ">
          <h5 id="listName">
            {list.list_name}
          </h5>
          <div onClick={() => toggleTaskForm()}>
            <FontAwesomeIcon icon={faPlusSquare}/>
          </div>

          {isToggledTaskForm ? showTaskForm() : <div> Add new task</div>}

          {list.taski.map((task) => {
            return (
              <div className="" id="tasksWrapper">
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


  return (
    <div id="mainEditorComponent" className="root col-5">
      <div className="scrollIt">
        <div id="centerComponent">
          <div className="row" id="toggleWrapper">
            <div onClick={() => toggleTrueFalse()} className="col-1">
              <FontAwesomeIcon icon={faPlusSquare}/>
            </div>
            {isToggled ? showListForm() : <div className="col-11"> Add new list or choose existing one to edit </div>}
          </div>
          {list ? renderClickedList(list) : null}
        </div>
      </div>
    </div>
  )
}

export default MainEditorComponent;