import React from "react";
import axios from 'axios';
import '../App.css';
import {Redirect} from "react-router-dom";
import TaskComponent from "./TaskComponent";
import NavbarComponent from "./NavbarComponent";
import PageTemplateComponent from "./PageTemplateComponent";


export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      list_name: '',

      activeItem: {
        id: null,
        title: '',
        completed: false,
        list: '',
      },

      editing: false,
      redirectToMain: false,
      searchField: '',

    }

    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleSubmitListName = this.handleSubmitListName.bind(this);
    this.handleSubmitTask = this.handleSubmitTask.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleChangeListName = this.handleChangeListName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeListID = this.handleChangeListID.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
  }


  handleChangeListName(event) {
    this.setState({
      list_name: event.target.value,
    });
  }


  handleChangeListID(event) {
    const activeItem = this.state.activeItem
    activeItem.list = event.target.value

    this.setState({
      activeItem: activeItem
    });
  }


  handleUpdate(task) {
    this.setState({
      editing: true
    })

    if (this.state.editing === true) {
      this.setState({
        activeItem: {
          title: task.title,
          id: task.id,
          completed: task.completed
        }
      })
    }
  }


  handleChange(event) {
    let name = event.target.name
    let value = event.target.value

    console.log('name: ', name)
    console.log('value: ', value)

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value,
      }
    })
  }


  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    axios.get('http://127.0.0.1:8000/api/list/')
      .then((response) => {
        console.log(response)
        this.setState({
          todoList: response.data,
        })
        console.log(this.state.todoList)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  handleSubmitTask(event) {
    event.preventDefault();

    if (this.state.editing === true) {
      axios.put('http://127.0.0.1:8000/api/tasks/' + this.state.activeItem.id + '/', this.state.activeItem).then(
        (response) => {
          console.log(this.state.list)
          this.fetchTasks()
          console.log(response);
          this.setState({
            editing: false
          })
        }
      ).catch((error) => {
        console.log(error)
      })
    } else {
      axios.post('http://127.0.0.1:8000/api/tasks/', this.state.activeItem)
        .then((response) => {
          this.setState({
              activeItem: {
                id: null,
                title: '',
                completed: false,
              }
            }
          )
          console.log(response);
          this.fetchTasks()
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }


  handleComplete(task) {

    task.completed = !task.completed
    console.log(task.title)
    console.log(task.completed)

    axios.patch('http://127.0.0.1:8000/api/tasks/' + task.id + '/', task).then(
      (response) => {
        this.setState({
            completed: task.completed
          }
        )
        console.log(response)
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  handleSubmitListName(event) {
    event.preventDefault();
    const data = {
      list_name: this.state.list_name
    }
    axios.post('http://127.0.0.1:8000/api/list/', data)
      .then((response) => {
        this.fetchTasks()
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  handleDeleteList(list) {
    axios.delete('http://127.0.0.1:8000/api/list/' + list.id + '/').then(
      (response) => {
        this.fetchTasks()
        console.log(response);
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  handleDelete(task) {
    axios.delete('http://127.0.0.1:8000/api/tasks/' + task.id + '/').then(
      (response) => {
        this.fetchTasks()
        console.log(response);
      }
    ).catch((error) => {
      console.log(error)
    })
  }



  render() {
    let lists = this.state.todoList;
    let self = this;


    if (this.state.redirectToMain) {
      return (<Redirect to="/main"/>)
    }

    return (
      <PageTemplateComponent>
        <div>Start creating your lists!</div>
        <div>
          <div className="container">
            <div id="task-container">
              <div id="form-wrapper">
                <form onSubmit={this.handleSubmitListName} id="form">
                  <div className="flex-wrapper">
                    <div style={{flex: 6}}>
                      <input
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="nazwa listy"
                        onChange={this.handleChangeListName}
                        value={this.state.list_name}
                      />
                    </div>
                    <div style={{flex: 1}}>
                      <input id="submit" className="btn btn-warning" type="submit" name="add"/>
                    </div>
                  </div>
                </form>
                <form onSubmit={this.handleSubmitTask} id="form">
                  <div className="flex-wrapper">
                    <div style={{flex: 6}}>
                      <input
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="nazwa taska"
                        onChange={this.handleChange}
                        value={this.state.activeItem.title}
                      />
                      <input
                        className="form-control"
                        placeholder="id listy"
                        onChange={this.handleChangeListID}
                        value={this.state.list}
                      />
                    </div>
                    <div style={{flex: 1}}>
                      <input id="submit" className="btn btn-warning" type="submit" name="add"/>
                    </div>
                  </div>
                </form>
              </div>


              <div id="list-wrapper">
                {lists.map((list, index) => {
                  return (
                    <div key={index} className="task-wrapper flex-wrapper ">
                      <div style={{flex: 7}}>
                        <h5>{list.list_name}</h5>
                        <div>
                          <button onClick={() => self.handleDeleteList(list)}
                                  className="btn btn-sm btn-outline-dark delete">-
                          </button>
                        </div>
                        <br/>
                        {list.taski.map((task, index) => {
                          return (
                            <div key={index}>
                              <div style={{flex: 7}}>
                             <span onClick={() => self.handleComplete(task)}>
                               {task.completed === false ? (<span><TaskComponent task={task}/></span>) : (
                                 <del>
                                   <TaskComponent task={task}/>
                                 </del>
                               )}
                               </span>
                              </div>
                              <div>
                                <button onClick={() => self.handleDelete(task)}
                                        className="btn btn-sm btn-outline-dark delete">-
                                </button>
                              </div>
                              <div style={{flex: 1}}>
                                <button onClick={() => self.handleUpdate(task)}
                                        className="btn btn-sm btn-outline-info">Edit
                                </button>
                              </div>
                            </div>)
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </PageTemplateComponent>
    )
  }
}