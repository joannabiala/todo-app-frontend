import React, {useState, useEffect  } from "react";
import axios from "axios";

const ListsAndTasksDisplayingComponent = ()=>{
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

  return(
    <div id="ListsAndTasksDisplayingComponent">
      <div >
        {lists.map((list, index) => {
          return (
            <div key={index}>
              <div>
                <h5>{list.list_name}</h5>
                <div>
                  <button
                    onClick={() => handleDeleteList(list)}
                  >
                    -
                  </button>
                </div>
                <br/>


                {list.taski.map((task, index) => {
                  return (
                    <div>
                      <div>
                             <span onClick={() => handleComplete(task)}>
                               {task.completed === false ? (<span>{task.title}
                                 {task.completed}</span>) : (
                                 <del>
                                   {task.title}
                                   {task.completed}
                                 </del>
                               )}
                               </span>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDelete(task)}
                        >
                          -
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => handleUpdate(task)}
                        >
                          Edit
                        </button>
                      </div>
                      <hr/>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListsAndTasksDisplayingComponent;