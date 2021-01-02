import React, {useState, useEffect} from "react";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'


const ListsAndTasksComponent = ({onListChange}) => {
  const [todoList, setTodoList] = useState([])
  const [activeItem, setActiveItem] = useState({
    id: null,
    title: '',
    completed: false,
    list: ''
  })

  const [editing, setEditing] = useState(false)
  const [isLoadingContent, setIsLoadingContent] = useState(true)

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

  let lists = todoList;

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

  return (

    <div id="leftSideComponent" className="root col-3">
      <div className="scrollIt">
        <div>
          <div className="d-flex flex-row col-8">
            <h4 id="leftComponentTitle">My lists of tasks: </h4>
          </div>
        </div>
        {lists.map((list, index) => {
          return (
            <div onClick={() => onListChange(list)}
                 className="list-group" key={index}
            >
              <p id="listWrapper" href="#" className=" d-flex flex-row list-group-item flex-column align-items-start ">
                <div>
                  <h5 id="listName">{list.list_name}</h5>
                  <div>
                    <FontAwesomeIcon onClick={() => handleDeleteList(list)} icon={faTrashAlt}/>
                  </div>
                  <br/>

                  {list.taski.map((task, index) => {
                    return (
                      <div id="tasksWrapper">
                        <div id="taskTitle">
                        <span onClick={() => handleComplete(task)}>
                          {task.completed === false ? (<span>{task.title}
                            {task.completed}</span>) : (
                            <del>
                              <p> {task.title} </p>
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
                  })}
                </div>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListsAndTasksComponent;