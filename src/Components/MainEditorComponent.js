import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

const MainEditorComponent = (props) => {
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

  return (
    <div className="col-5" id="mainEditorComponent">
      <div className="row">

        <div>
          {isLoadingContent ? (<div/>) :
            todoList.length === 0 && addingList === false ? (
                <button onClick={addList}>
                  Jakiś buton
                </button>)
              :
              (<div>
                  <form onSubmit={handleSubmitListName} id="form">
                    <div>
                      <div>
                        <input
                          id="title"
                          name="title"
                          placeholder="nazwa listy"
                          onChange={(e) => setList_name(e.target.value)}
                          value={list_name}
                        />
                      </div>
                      <div>
                        <input
                          id="submit"
                          className="btn btn-warning"
                          type="submit"
                          name="add"
                        />
                      </div>
                    </div>
                  </form>
                  <form onSubmit={handleSubmitTask} id="form">
                    <div>
                      <input

                        id="title"
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
                        className="btn btn-warning"
                        type="submit"
                        name="add"
                      />
                    </div>
                  </form>
                </div>
              )
          }
        </div>
      </div>
    </div>

  )
}

export default MainEditorComponent;