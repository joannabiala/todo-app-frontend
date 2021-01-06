import React, {useState, useEffect} from "react";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const ListsAndTasksComponent = ({onListChange, todoList, fetchTasks}) => {
  const [selectedListIndex, setSelectedListIndex] = useState(null)

  useEffect(() => {
    if (selectedListIndex !== null) {
      onListChange(todoList[selectedListIndex])
    }
  }, [onListChange, todoList, selectedListIndex])

  const handleDeleteList = (list) => {
    axios.delete('http://127.0.0.1:8000/api/list/' + list.id + '/').then(
      (response) => {
        setSelectedListIndex(null)
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
        console.log(response)
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  return (
    <div id="leftSideComponent" className="root col-xs-12  col-sm-12 col-md-6 col-lg-6 col-xl-3">
      <div className="scrollIt">
        <div>
          <div className="d-flex flex-row col-8">
            <h4 id="leftComponentTitle">My lists of tasks: </h4>
          </div>
        </div>

        {todoList.map((list, index) => {
            return (
              <div onClick={() => setSelectedListIndex(index)}
                   className="list-group" key={index}
              >
                <p id="listWrapper" className=" d-flex flex-row list-group-item flex-column align-items-start ">
                  <div className="container-fluid">
                    <div id="listNameWrapper" className="row">
                      <div>
                        <h5 id="listName">
                          {list.list_name}
                        </h5>
                      </div>
                      <div>
                        <FontAwesomeIcon onClick={() => handleDeleteList(list)} icon={faTrashAlt}/>
                      </div>
                    </div>

                    {list.taski.map((task, index) => {
                      return (
                        <div className="row" id="tasksWrapper">
                          <div className="col-8" id="taskTitle">
                        <span onClick={() => handleComplete(task)}>
                          {task.completed === false ? (<span>{task.title}
                            {task.completed}</span>) : (
                            <del>
                              <p>
                                {task.title}
                              </p>
                              {task.completed}
                            </del>
                          )}
                        </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </p>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default ListsAndTasksComponent;