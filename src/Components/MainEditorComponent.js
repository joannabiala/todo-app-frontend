import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusSquare, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const MainEditorComponent = ({index, list}) => {
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
  const [addingList, setAddingList] = useState(false)
  const [isLoadingContent, setIsLoadingContent] = useState(true)
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);

  const handleChangeListID = (event) => {
    const updatedActiveItem = {...activeItem}
    updatedActiveItem.list = event.target.value
    setActiveItem(updatedActiveItem)
  }


  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value

    console.log('name: ', name)
    console.log('value: ', value)

    setActiveItem({
      ...activeItem,
      title: value,
    })
  }


  useEffect(() => {
    fetchTasks()
  }, [])


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


  const handleSubmitTask = (event) => {
    event.preventDefault();
    if (editing === true) {
      axios.put('http://127.0.0.1:8000/api/tasks/' + activeItem.id + '/', activeItem).then(
        (response) => {
          console.log(activeItem.list)
          fetchTasks()
          console.log(response);
          setEditing(false)
        }
      ).catch((error) => {
        console.log(error)
      })
    } else {
      axios.post('http://127.0.0.1:8000/api/tasks/', activeItem)
        .then((response) => {
          setActiveItem({
            id: null,
            title: '',
            completed: false,
          })
          console.log(response);
          fetchTasks()
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }


  const handleSubmitListName = (event) => {
    event.preventDefault();
    const data = {
      list_name: list_name
    }
    axios.post('http://127.0.0.1:8000/api/list/', data)
      .then((response) => {
        fetchTasks()
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const addList = () => {
    setAddingList(true)
  }


  if (redirectToMain) {
    return (<Redirect to="/main"/>)
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


  const renderClickedList = (list) => {
    return (
      <div className="list-group col-12">
        <p id="listWrapper" href="#" className="col-12 d-flex flex-row list-group-item flex-column">
          <h5 id="listName">
            {list.list_name}
          </h5>
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
        </p>
      </div>
    )
  }


  const showForm = () => {
    return (
      <div className="col-12">
        <form id="form">
          <div>
            <input
              id="title"
              className="form-control"
              name="title"
              placeholder="nazwa listy"
              onChange={(e) => setList_name(e.target.value)}
              value={list_name}
            />
          </div>
          <div>
            <button
              onClick={handleSubmitListName}
              id="submit"
              className="btn btn-warning"
              type="submit"
              name="add"
            />
          </div>

        </form>
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
              className="form-control"
              placeholder="id listy"
              onChange={handleChangeListID}
              value={activeItem.list}
            />
            <input
              id="submit"
              className="form-control"
              type="submit"
              name="add"
            />
          </div>
        </form>
      </div>

    )
  }

  return (
    <div id="mainEditorComponent" className="root col-5">
      <div className="scrollIt">
        <div id="centerComponent" className="row">
          <div onClick={() => toggleTrueFalse()} className="">
            <FontAwesomeIcon icon={faPlusSquare}/>
          </div>
          {isToggled ? showForm() : <div> Add new list or choose existing one to edit </div>}
          {list ? renderClickedList(list) : null}
        </div>
      </div>
    </div>
  )
}

export default MainEditorComponent;